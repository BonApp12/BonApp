import React, {useEffect, useState} from "react";
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import {useParams} from "react-router-dom";
import fetchRestaurantById from "../../requests/restaurant/fetchRestaurantById";

const RestaurantManager = () => {

    let params = useParams();
    const [restaurant, setRestaurant] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        let idRestaurant = params.idRestaurant;
        fetchRestaurantById(setRestaurant, setIsLoaded, setError, idRestaurant);
    }, [params.idRestaurant])



    // TODO : Rajouter un menu contextuel permettant de naviguer dans les différentes fonction de gestion d'un restaurant.
    // TODO : Rajouter un formulaire permettant d'ajouter ou modifier les plats
    // TODO : Éventuellement songer à coder ça spécialement pour les ordinateurs de bureau.
    return (
       <div>
           {isLoaded === true ? (error !== null ? <p>{error}</p> : "") : ""}
           <h1>{restaurant.name}</h1>
           <RestaurantForm restaurant={restaurant} />
       </div>
    )
}
export default RestaurantManager;