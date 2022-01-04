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


    return (
       <div className="container">
           <h1 className="mt-5">{restaurant.name}</h1>
           <RestaurantForm restaurant={restaurant} />
       </div>
    )
}
export default RestaurantManager;