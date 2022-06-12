const fetchRestaurantByIdTable = (setRestaurant, setIsLoaded, setError, idRestaurant, idTable, navigate) => {
    fetch(process.env.REACT_APP_URL_BACKEND + "/restaurant/" + idRestaurant + "/" + idTable, {
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
                setIsLoaded(false);
                setError(error);
            }
        )
};

export default fetchRestaurantByIdTable;
