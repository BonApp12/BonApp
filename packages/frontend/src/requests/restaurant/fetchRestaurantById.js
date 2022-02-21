const fetchRestaurantById = (setRestaurant, setIsLoaded, setError, idRestaurant) => {
    fetch(process.env.REACT_APP_URL_BACKEND + "/restaurant/" + idRestaurant, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(
            (result) => {
                setRestaurant(result);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}

export default fetchRestaurantById;
