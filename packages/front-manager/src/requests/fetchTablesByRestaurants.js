const fetchTablesByRestaurants = (idRestaurant) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/restaurant/'+idRestaurant+'/tables', {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default fetchTablesByRestaurants;
