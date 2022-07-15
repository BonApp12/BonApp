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
import {toast} from "react-toastify";
import {userAtom} from "../../states/user";
import {nicknameAtom} from "../../states/nickname";
import {restaurantAtom} from "../../states/restaurant";
import {orderAtom} from "../../states/order";
import createOrder from "../../requests/orders/createOrder";
import {Asker} from "../../components/Asker/Asker";
import {tableAtom} from "../../states/table";
import safeHtml from "safe-html";
import {addItemToCart, initializeCart, removeItemFromCart, updateUsersCart} from "../../helpers/cart";
import {generateNickName, hasChangedTable} from "../../helpers/user";
import fetchRestaurantByIdTable from "../../requests/restaurant/fetchRestaurantByIdTable";
import {searchByPlateName} from "../../helpers/restaurant";


const ProductsList = () => {


    // Setting up states
    const [searchParams, setSearchParams] = useSearchParams();
    const [params] = useState(useParams());
    const idRestaurantParams = useMemo(() => params.idRestaurant, []);
    const idTableParams = useMemo(() => params.idTable, []);
    const [loader, setLoader] = useState({isLoaded: false, error: null});
    const [tableExists, setTableExists] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const [otherCart, updateOtherCart] = useState([]); // Fill this variables with the sockets and the connection.
    const [cart, updateCart] = useRecoilState(cartAtom);
    const [userState] = useRecoilState(userAtom);
    const [currentRestaurantId, setCurrentRestaurantId] = useRecoilState(restaurantAtom);
    const [nickname, setNickname] = useRecoilState(nicknameAtom);
    const [currentTableId, setCurrentTableId] = useRecoilState(tableAtom);
    const [order, setOrder] = useRecoilState(orderAtom);


    // Handling ingredients modal
    const [modalManagement, setModalManagement] = useState({isOpen: false, data: null});

    // Initializing socket
    const socket = useContext(SocketContext);


    // Searching query
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlates, setFilteredPlates] = useState(null);
    const navigate = useNavigate();


    // Searching plates
    useEffect(() => {
        setFilteredPlates(searchByPlateName(restaurant.plates, searchQuery));
    }, [restaurant, searchQuery]);

    // Setting nickname (randomly generated / user's email) and restaurant ID
    useEffect(() => {
        setNickname(generateNickName(nickname, userState, currentRestaurantId, currentTableId));
        const hasChanged = hasChangedTable(currentRestaurantId, currentTableId, idRestaurantParams, idTableParams, order);
        setCurrentRestaurantId(hasChanged.idRestaurantParams);
        setCurrentTableId(hasChanged.idTableParams);
        setOrder(hasChanged.order);
    }, []);

    // Gathering restaurant informations & setting up sockets events - joining table.
    useEffect(() => {
        // console.log(restaurantFetch, loading, error);
        fetchRestaurantByIdTable(idRestaurantParams, idTableParams)
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

    }, [idRestaurantParams, idTableParams, socket, params]);

    useEffect(() => {
        if (tableExists) {
            socket.emit('userJoinTable', {
                idTable: idTableParams,
                idRestaurant: idRestaurantParams,
                user: {nickname, cart, order},
            });

            socket.on('userJoinedTable', (users) => {
                console.log(users);
                updateOtherCart(updateUsersCart(users, nickname));
            });

            socket.on('userLeftRoom', (users) => {
                updateOtherCart(updateUsersCart(users, nickname));
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
    }, [tableExists, idTableParams, idRestaurantParams, nickname]);

    /* itemCartUpdated/userCartUpdated socket listener / receiver & filteredPlates cart quantity updater */
    useEffect(() => {
        socket.on('itemCartUpdated', (users) => {
            updateOtherCart(updateUsersCart(users, nickname));
        });
    }, [nickname, userState, cart]);

    useEffect(() => {
        //On initialise les plats avec une quantité pour pouvoir l'afficher coté front.
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
            createOrder(cart, restaurant, idTableParams, userState ?? undefined)
                .then((result) => result.json())
                .then((orderSuccess) => {
                    socket.emit('createOrder', {...orderSuccess});
                    setOrder([...order, orderSuccess]);
                    updateCart([]);
                    searchParams.delete('redirect_status');
                    searchParams.delete('payment_intent_client_secret');
                    searchParams.delete('payment_intent');
                    setSearchParams(searchParams);
                });
        }
    }, [searchParams, restaurant, tableExists]);

    const updateOrderSocket = (newOrder) => {
        let orderCopy = cloneDeep(order);
        orderCopy[orderCopy.findIndex(orderItem => orderItem.id === newOrder.id)] = newOrder;
        setOrder(orderCopy);
    };

    function removeFromCart(plate) {
        updateCart(removeItemFromCart(cart, plate));
        socket.emit('removeFromCart', {idTable: idTableParams, idRestaurant: idRestaurantParams, plate});
    }

    const needSomething = useCallback(function needSomething(thing) {
        socket.emit("needSomething", {idTable: idTableParams, idRestaurant: idRestaurantParams, thing});
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
