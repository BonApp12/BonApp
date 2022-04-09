const fetchFullOrder = (idOrder, params) => {
    if (params === 'only-orders') {
        return fetch(process.env.REACT_APP_URL_BACKEND + '/orders/restaurant/' + idOrder, {
            crossDomain: true,
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
    } else if (params === 'to-do') {
        return fetch(process.env.REACT_APP_URL_BACKEND + '/orders/restaurant/' + idOrder + '/status/to-do', {
            crossDomain: true,
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
    }
}

export default fetchFullOrder;
