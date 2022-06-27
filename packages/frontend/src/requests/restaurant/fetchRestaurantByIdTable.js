const fetchRestaurantByIdTable = (setRestaurant, setIsLoaded, setError, idRestaurant, idTable, setTableExists, navigate) => {
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
                } else if (!result){
                    setError(true);
                    setIsLoaded(true);
                } else {
                    setRestaurant(result);
                    setIsLoaded(true);
                    setTableExists(true);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
};

export default fetchRestaurantByIdTable;
