const fetchRestaurantById = (setRestaurant, setIsLoaded, setError, idRestaurant, navigate) => {
    fetch(process.env.REACT_APP_URL_BACKEND + "/restaurant/" + idRestaurant, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.hasOwnProperty('statusCode') && result.statusCode === 401){
                    navigate('/');
                }else{
                    setRestaurant(result);
                    setIsLoaded(true);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
}

export default fetchRestaurantById;
