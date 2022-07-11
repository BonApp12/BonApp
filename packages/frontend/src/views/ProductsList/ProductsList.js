import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import {SocketContext} from "../../context/socket";
import Layout from "../../components/Layout/Layout";
import Loading from "../../components/Loading/Loading";
import {useRecoilState} from "recoil";
import {cartAtom} from "../../states/cart";
import {Information} from "../../components/overlay/information";
import {MdOutlineFastfood} from "react-icons/md";
import {cloneDeep} from "tailwindcss/lib/util/cloneDeep";
import fetchRestaurantByIdTable from "../../requests/restaurant/fetchRestaurantByIdTable";
import {toast} from "react-toastify";
import {userAtom} from "../../states/user";
import {nicknameAtom} from "../../states/nickname";
import {restaurantAtom} from "../../states/restaurant";
import {orderAtom} from "../../states/order";
import {adjectives, animals, colors, uniqueNamesGenerator} from 'unique-names-generator';
import createOrder from "../../requests/orders/createOrder";
import {Asker} from "../../components/Asker/Asker";
import {tableAtom} from "../../states/table";
import safeHtml from "safe-html";
import {addItemToCart, initializeCart, removeItemFromCart} from "../../helpers/cart";


const ProductsList = () => {


    // Setting up states
    const [searchParams, setSearchParams] = useSearchParams();
    const [params] = useState(useParams());
    const idRestaurant = useMemo(() => params.idRestaurant, []);
    const idTable = useMemo(() => params.idTable, []);
    const [loader, setLoader] = useState({isLoaded: false, error: null});
    const [tableExists, setTableExists] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const [otherCart, updateOtherCart] = useState([]); // Fill this variables with the sockets and the connection.
    const [cart, updateCart] = useRecoilState(cartAtom);
    const [userState] = useRecoilState(userAtom);
    const [nickname, setNickname] = useRecoilState(nicknameAtom);
    const [currentRestaurant, setCurrentRestaurant] = useRecoilState(restaurantAtom);
    const [currentTable, setCurrentTable] = useRecoilState(tableAtom);
    const [order, setOrder] = useRecoilState(orderAtom);

    // Handling ingredients modal
    const [modalManagement, setModalManagement] = useState({isOpen: false, data: null});

    // Initializing socket
    const socket = useContext(SocketContext);


    // Searching query
    const {search} = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [filteredPlates, setFilteredPlates] = useState(null);
    const navigate = useNavigate();


    // Searching plates
    useEffect(() => {
        const searchedPlate = searchQuery.length ? restaurant.plates.filter((plate) => {
            // Récupération des noms des plats, retrait des accents et mise en minuscule pour comparaison.
            const plateName = plate.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const finalQuery = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            return plateName.includes(finalQuery.toLowerCase());
        }) : restaurant.plates;
        setFilteredPlates(searchedPlate);
    }, [restaurant, searchQuery]);

    // Setting nickname (randomly generated / user's email) and restaurant ID
    useEffect(() => {

        if (!nickname) {
            if (userState?.email !== undefined) {
                setNickname(userState.email);
            } else {
                setNickname(uniqueNamesGenerator({dictionaries: [adjectives, animals, colors]}));
            }
        }
        if (!currentRestaurant || !currentTable) {
            setCurrentRestaurant(idRestaurant);
            setCurrentTable(idTable);
        } else {
            if (currentRestaurant !== idRestaurant) {
                setNickname(uniqueNamesGenerator({dictionaries: [adjectives, animals, colors]}));
                setCurrentRestaurant(idRestaurant);
                setCurrentTable(idTable);
                setOrder([]); // Resetting orders since we aren't in the same restaurant anymore
            }
            if (currentRestaurant === idRestaurant && currentTable !== idTable) {
                setCurrentTable(idTable);
                setOrder([]); // Resetting orders since we aren't in the same table anymore
            }
        }

    }, []);
    // Gathering restaurant informations & setting up sockets events - joining table.
    useEffect(() => {
        fetchRestaurantByIdTable(idRestaurant, idTable)
            .then(
                (restaurantResponse) => {
                    if (restaurantResponse.hasOwnProperty('statusCode') && restaurantResponse.statusCode === 401) {
                        navigate('/');
                    } else if (!restaurantResponse) {
                        setLoader({isLoaded: true, error: true});
                    } else {
                        setRestaurant(restaurantResponse);
                        setTableExists(true);
                        setFilteredPlates(initializeCart(cart, restaurantResponse.plates));
                        setLoader({isLoaded: true, error: false});
                    }
                },
                (error) => {
                    setLoader({isLoaded: true, error: error});

                }
            );
    }, [idRestaurant, idTable, socket, params]);

    useEffect(() => {
        if (tableExists) {
            socket.emit('joinTable', {
                idTable,
                idRestaurant,
                user: {
                    nickname: userState?.email ?? nickname,
                    cart,
                    order
                },
            });
            socket.on('userJoinedRoom', (carts) => {
                updateUsersCart(carts);
            });
            socket.on('userLeftRoom', (carts) => {
                updateUsersCart(carts);
            });
            socket.on('orderUpdated', (newOrder) => {
                toast.success('La commande a été mise à jour', {position: "top-right"});
                updateOrderSocket(newOrder);
            });
            socket.on('orderCompleted', (newOrder) => {
                toast.success('La commande a été remise !', {position: "top-right"});
                updateOrderSocket(newOrder);
            });
        }
    }, [tableExists, idTable, idRestaurant]);

    /* itemCartUpdated/userCartUpdated socket listener / receiver & filteredPlates cart quantity updater */
    useEffect(() => {
        socket.on('itemCartUpdated', (carts) => {
            updateUsersCart(carts);
        });
    }, [nickname, userState, cart]);

    useEffect(() => {
        if (filteredPlates !== null) {
            let copyFilteredPlates = cloneDeep(filteredPlates);
            cart.map((item) => {
                return copyFilteredPlates[copyFilteredPlates.findIndex(plate => plate.id === item.id)].quantity = item.quantity;
            });
            setFilteredPlates(copyFilteredPlates);
        }
        socket.emit('userCartUpdated', {cart, user: userState});
    }, [cart]);

    /* Sending order if payment fullfilled */
    useEffect(() => {
        if (searchParams.get('redirect_status') === 'succeeded' && restaurant?.id !== undefined && tableExists !== false) {
            createOrder(cart, restaurant, idTable, userState ?? undefined)
                .then((result) => result.json())
                .then((res) => {
                    socket.emit('createOrder', {...res});
                    setOrder([...order, res]);
                    updateCart([]);
                    searchParams.delete('redirect_status');
                    searchParams.delete('payment_intent_client_secret');
                    searchParams.delete('payment_intent');
                    setSearchParams(searchParams);
                });
        }
    }, [searchParams, restaurant, tableExists]);


    function updateUsersCart(carts) {
        const otherCarts = carts.filter((user) => user.nickname !== nickname);
        updateOtherCart(otherCarts);
    }

    const updateOrderSocket = (newOrder) => {
        let orderCopy = cloneDeep(order);
        orderCopy[orderCopy.findIndex(orderItem => orderItem.id === newOrder.id)] = newOrder;
        setOrder(orderCopy);
    };

    function removeFromCart(plate) {
        updateCart(removeItemFromCart(cart, plate));
        socket.emit('removeFromCart', {idTable, idRestaurant, plate});
    }

    const needSomething = useCallback(function needSomething(thing) {
        socket.emit("needSomething", {idTable, idRestaurant, thing});
    }, []);

    if (loader.error) return <div>Erreur dans le chargement. Veuillez réessayer</div>;
    if (!loader.isLoaded) return <div><Loading/></div>;

    return (
        <div className="sidebar-cart">
            <Layout restaurant={restaurant} otherCart={otherCart}/>
            <Asker needSomething={(needSomething)}/>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <ol>
                {
                    loader.isLoaded && !loader.error ?
                        filteredPlates?.filter(plate => plate.display).map(plate => {
                            return (
                                <Card name={plate.name}
                                      key={plate.id}
                                      removeFromCart={() => removeFromCart(plate)}
                                      addToCart={() => updateCart(addItemToCart(cart, plate))}
                                      plateProps={plate}
                                      setDisplayModal={() => {
                                          setModalManagement({
                                              data: {
                                                  ingredients: plate?.ingredients,
                                                  description: plate.description
                                              },
                                              isOpen: !modalManagement.isOpen
                                          });
                                      }}
                                      restaurant={restaurant}
                                      cart={cart}
                                />

                            );
                        })
                        : <div key="erreur">Erreur dans le chargement. Veuillez réessayer</div>
                }
            </ol>

            <Information displayModal={modalManagement} setDisplayModal={setModalManagement}>
                <h3 className="font-bold pt-6 pb-4 text-left pl-3">Ingrédients & informations</h3>
                <div className="modal-content">
                    <div className="grid grid-cols-2 place-content-center ">
                        {modalManagement.data?.ingredients.map((ingredient) => (
                            <div className="text-left ml-16 hover:text-orange-600 ease-in duration-300"
                                 key={ingredient.id}>
                                <MdOutlineFastfood className="inline-block"/>
                                {ingredient.name}
                            </div>
                        ))}
                    </div>
                    <h3 className="font-bold pt-6 pb-4 text-left pl-3">Description</h3>
                    <div className="plate-description"
                         dangerouslySetInnerHTML={{__html: safeHtml(modalManagement.data?.description || '')}}>
                    </div>

                </div>
            </Information>

        </div>

    );
};

export default ProductsList;
