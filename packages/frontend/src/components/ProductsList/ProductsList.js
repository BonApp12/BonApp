import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import fetchRestaurantById from "../../requests/restaurant/fetchRestaurantById";
import {SocketContext} from "../../context/socket";
import Layout from "../Layout/Layout";
import Loading from "../Loading/Loading";
import {useRecoilState} from "recoil";
import {cartAtom} from "../../states/cart";

const ProductsList = () => {
    let params = useParams();

    // Setting up states
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const [cart, updateCart] = useRecoilState(cartAtom);
    // Handling socket
    const socket = useContext(SocketContext);

    // Filtering plates depending of query
    const filterPlates = (plates, query) => {
        if (!query) {
            return plates;
        }

        return plates.filter((plate) => {
            // Récupération des noms des plats, retrait des accents et mise en minuscule pour comparaison.
            const plateName = plate.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const finalQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            return plateName.includes(finalQuery.toLowerCase());
        })
    }

    // Searching query
    const {search} = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPlates = filterPlates(restaurant.plates, searchQuery);

    // useEffect to get orders : just for testing purposes. Change it to send orders in time.
    useEffect(() => {
        socket.emit("findOneOrder", {id: 1});
    }, [socket])

    useEffect(() => {
        let idRestaurant = params.idRestaurant;
        fetchRestaurantById(setRestaurant, setIsLoaded, setError, idRestaurant);
    }, [params.idRestaurant])


    function addToCart(plate) {
        updateCart([...cart, plate])
    }

    function removeFromCart(plate) {
        const indexPLateToRemove = cart.findIndex(plateElement => plateElement.id === plate.id);
        const copyOfCart = [...cart]
        copyOfCart.splice(indexPLateToRemove, 1);
        updateCart(copyOfCart)
    }


    if (error) {
        return <div>Erreur dans le chargement. Veuillez réessayer</div>
    } else if (!isLoaded) {
        return <div><Loading/></div>
    } else {
        return (
            <div className="sidebar-cart">
                <Layout restaurant={restaurant}/>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <ol>
                    {
                        filteredPlates.map(plate => {
                            return (
                                <Card name={plate.name} key={plate.id} removeFromCart={() => removeFromCart(plate)}
                                      addToCart={() => addToCart(plate)} plate={plate} restaurant={restaurant}
                                      cart={cart} updateCart={updateCart}/>
                            )
                        })
                    }
                </ol>
            </div>)
    }
}

export default ProductsList;
