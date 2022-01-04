import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import fetchRestaurantById from "../../requests/restaurant/fetchRestaurantById";

const ProductsList = () => {
    let params = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurant, setRestaurant] = useState([]);

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


    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPlates = filterPlates(restaurant.plates, searchQuery);


    useEffect(() => {
        let idRestaurant = params.idRestaurant;
        fetchRestaurantById(setRestaurant, setIsLoaded, setError, idRestaurant);
    }, [params.idRestaurant])

    if (error) {
        return <div>Erreur dans le chargement. Veuillez réessayer</div>
    } else if (!isLoaded) {
        return <div>Chargement</div>
    } else {
        return (
        <div>
            <h2 className="mt-5">{restaurant.name}</h2>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ol>
                {
                    filteredPlates.map((plate, index) => {
                        return (
                            <Card name={plate.name} key={plate.id} />
                        )
                    })
                }
            </ol>
        </div>)
    }
}

export default ProductsList;