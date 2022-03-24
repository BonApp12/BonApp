const fetchFullOrder = (idOrder) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/orders/restaurant/' + idOrder + '/status/to-do', {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
}

export default fetchFullOrder;
