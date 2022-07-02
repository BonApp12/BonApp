const countPlateByRestaurant = (restaurantId) => {
    let url = process.env.REACT_APP_URL_BACKEND + `/plate/restaurant/${restaurantId}/count`;
    return fetch(url, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default countPlateByRestaurant;
