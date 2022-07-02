import resetUserConnected from "../../helpers/resetUserConnected";

const fetchRestaurantById = (setRestaurant, setIsLoaded, setError, idRestaurant, navigate, setUser) => {
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
                    resetUserConnected(setUser,navigate);
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
// TODO : Fermer cette route spécifique à l'application frontend, ne l'ouvrir seulement aux administrateurs

export default fetchRestaurantById;
