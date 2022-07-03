const fetchAddressRestaurant = (id) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'address/restaurant/' + id, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default fetchAddressRestaurant;
