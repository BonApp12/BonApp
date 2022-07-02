const fetchFullOrder = (restaurantId, params) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/orders/restaurant/' + restaurantId;
    if (params === 'to-do') url = process.env.REACT_APP_URL_BACKEND + `/orders/restaurant/${restaurantId}/status/to-do`;

    return fetch(url, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        //,
    })
}

export default fetchFullOrder;