import React, {useState, useEffect, useContext, useCallback} from "react";
import {useParams, useNavigate} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import fetchRestaurantById from "../../requests/restaurant/fetchRestaurantById";
import {SocketContext} from "../../context/socket";
import Layout from "../Layout/Layout";
import LoadingPage from "../Loading/LoadingPage";

const ProductsList = () => {
    let params = useParams();
    const navigate = useNavigate();

    // Setting up states
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const [orders, setOrders] = useState([]);
    // Handling socket
    const socket = useContext(SocketContext);

    const addToCart = (e) => {
        //console.log(e); // Utiliser plus tard.
    };

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
        });
    };

    // Searching query
    const {search} = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPlates = filterPlates(restaurant.plates, searchQuery);

    // useEffect to get orders : just for testing purposes. Change it to send orders in time.
    useEffect(() => {
        socket.emit("findOneOrder", {id: 1});
        socket.on("oneOrder", (data) => console.log(data));
    }, [socket]);

    useEffect(() => {
        let idRestaurant = params.idRestaurant;
        fetchRestaurantById(setRestaurant, setIsLoaded, setError, idRestaurant, navigate);
    }, [params.idRestaurant]);

    if (error) return <div>Erreur dans le chargement. Veuillez réessayer</div>;
    else if (!isLoaded) return <LoadingPage/>;
    return (
        <>
            <Layout restaurant={restaurant}/>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <ol>
                {
                    filteredPlates.map((plate, index) => {
                        return (
                            <Card name={plate.name} key={plate.id} plateId={plate.id} restaurant={restaurant}
                                  addToCart={addToCart}/>
                        );
                    })
                }
            </ol>
        </>
    );
};

export default ProductsList;