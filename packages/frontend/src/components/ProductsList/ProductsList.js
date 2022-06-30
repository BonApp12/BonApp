import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import {SocketContext} from "../../context/socket";
import Layout from "../Layout/Layout";
import Loading from "../Loading/Loading";
import {useRecoilState} from "recoil";
import {cartAtom} from "../../states/cart";
import {Information} from "../overlay/information";
import {MdOutlineFastfood} from "react-icons/md";
import {cloneDeep} from "tailwindcss/lib/util/cloneDeep";
import fetchRestaurantByIdTable from "../../requests/restaurant/fetchRestaurantByIdTable";
import {toast} from "react-toastify";
import {userAtom} from "../../states/user";
import {adjectives, animals, colors, uniqueNamesGenerator} from 'unique-names-generator';


const ProductsList = () => {
    let params = useParams();
    const idRestaurant = params.idRestaurant;
    const idTable = params.idTable;

    // Setting up states
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tableExists, setTableExists] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const [otherCart, updateOtherCart] = useState([]); // Fill this variables with the sockets and the connection.
    const [cart, updateCart] = useRecoilState(cartAtom);
    const [userState, setUserState] = useRecoilState(userAtom);
    const [randomName, setRandomName] = useState(undefined);

    // Handling ingredients modal
    const [modalManagement, setModalManagement] = useState({isOpen: false, data: null});

    // Initializing socket
    const socket = useContext(SocketContext);

    // Filtering plates depending of query
    const filterPlates = (plates, query) => {
        if (!query && plates !== undefined) {
            if (cart.length > 0) {
                return plates.map((item) => ({
                    ...item,
                    quantity: cart[cart.findIndex(plateInCart => plateInCart.id === item.id)]?.quantity || 1
                }));
            } else {
                return plates.map((item) => ({
                    ...item,
                    quantity: 1,
                }));
            }
        } else if (query && plates !== undefined) {
            return plates.filter((plate) => {
                // Récupération des noms des plats, retrait des accents et mise en minuscule pour comparaison.
                const plateName = plate.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                const finalQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                return plateName.includes(finalQuery.toLowerCase());
            });
        }
    };

    // Searching query
    const {search} = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [filteredPlates, setFilteredPlates] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userState === null) {
            let randomGeneratedName = uniqueNamesGenerator({dictionaries: [adjectives, colors, animals]});
            setRandomName(randomGeneratedName);
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
                        setError(true);
                        setIsLoaded(true);
                    } else {
                        setRestaurant(restaurantResponse);
                        setTableExists(true);
                        setFilteredPlates(filterPlates(restaurantResponse.plates, searchQuery));
                        setIsLoaded(true);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [idRestaurant, idTable, socket]);

    useEffect(() => {
        if (tableExists) {
            socket.emit('joinTable', {
                idTable,
                idRestaurant,
                user: {
                    nickname: userState?.email ?? randomName,
                },
            });
            socket.on('userJoinedRoom', (carts) => {
                updateUsersCart(carts);
            });
            socket.on('userLeftRoom', (currentRoom) => {
                toast.error(`Quelqu'un a quitté la table...`);
                updateOtherCart(currentRoom);
            });
        }
    }, [tableExists, idTable, idRestaurant]);

    /* itemCartUpdated/userCartUpdated socket listener / receiver & filteredPlates cart quantity updater */
    useEffect(() => {
        socket.on('itemCartUpdated', (carts) => {
            updateUsersCart(carts);
        });
    }, [randomName, userState]);
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

    function addToCart(plate) {
        let indexPlateExists = cart.findIndex(plateInCart => plateInCart.id === plate.id);
        if (indexPlateExists === -1) updateCart([...cart, plate]);
        else {
            let cartCopy = cloneDeep(cart);
            cartCopy[indexPlateExists].quantity++;
            updateCart(cartCopy);
        }
    }

    function updateUsersCart(carts) {
        let currentNickname = "";
        if (userState) currentNickname = userState.email; else currentNickname = randomName;
        const otherCarts = carts.filter((user) => user.nickname !== currentNickname);
        console.error(currentNickname, otherCarts);
        updateOtherCart(otherCarts);
    }

    function removeFromCart(plate) { // TODO : Externaliser la fonction car dupliquée
        const indexPlateToRemove = cart.findIndex(plateElement => plateElement.id === plate.id);
        // If plates quantity is at 1, remove it from cart
        if (cart[indexPlateToRemove].quantity === 1) {
            let cartCopy = [...cart];
            cartCopy.splice(indexPlateToRemove, 1);
            updateCart(cartCopy);
        } else {
            let cartCopy = cloneDeep(cart);
            cartCopy[indexPlateToRemove].quantity--;
            updateCart(cartCopy);
        }
        socket.emit('removeFromCart', {idTable, idRestaurant, plate});
    }


    if (error) return <div>Erreur dans le chargement. Veuillez réessayer</div>;
    if (!isLoaded) return <div><Loading/></div>;

    return (
        <div className="sidebar-cart">
            <Layout restaurant={restaurant} otherCart={otherCart}/>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <ol>
                {
                    isLoaded && !error ?
                        filteredPlates.map(plate => {
                            return (
                                <Card name={plate.name}
                                      key={plate.id}
                                      removeFromCart={() => removeFromCart(plate)}
                                      addToCart={() => addToCart(plate)}
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
                         dangerouslySetInnerHTML={{__html: modalManagement.data?.description}}>
                    </div>
                </div>
            </Information>

        </div>

    );
};

export default ProductsList;
