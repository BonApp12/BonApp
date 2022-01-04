const fetchRestaurantById = (setRestaurant, setIsLoaded, setError, idRestaurant) => {
    fetch("http://localhost:4000/restaurant/" + idRestaurant, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors'
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