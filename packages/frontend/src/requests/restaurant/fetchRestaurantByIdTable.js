const fetchRestaurantByIdTable = (idRestaurant, idTable) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + "/restaurant/" + idRestaurant + "/" + idTable, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        //,
    })
        .then(res => res.json());
};

export default fetchRestaurantByIdTable;
