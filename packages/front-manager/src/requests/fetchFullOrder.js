const fetchFullOrder = (idOrder, params) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/orders/restaurant/' + idOrder;
    if (params === 'to-do') url = process.env.REACT_APP_URL_BACKEND + `/orders/restaurant/1/status/to-do`;

    return fetch(url, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
}

export default fetchFullOrder;