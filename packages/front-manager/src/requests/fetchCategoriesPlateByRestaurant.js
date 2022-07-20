const fetchCategoriesPlate = (idRestaurant) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'plate-category/restaurant/'+idRestaurant, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default fetchCategoriesPlate;
