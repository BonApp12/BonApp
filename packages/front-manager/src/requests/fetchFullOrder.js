const fetchFullOrder = (restaurantId, params) => {
    let url = process.env.REACT_APP_URL_BACKEND + 'orders/restaurant/' + restaurantId;
    if (params === 'to-do') url = process.env.REACT_APP_URL_BACKEND + `orders/restaurant/${restaurantId}/status/to-do`;
    if (params === 'completed') url = process.env.REACT_APP_URL_BACKEND + `orders/restaurant/${restaurantId}/status/completed`;
    if (params.includes('to-do') && params.includes('ready')) url = process.env.REACT_APP_URL_BACKEND + `orders/restaurant/${restaurantId}/status/not-completed`;
    return fetch(url, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
}

export default fetchFullOrder;
