const fetchFullOrder = (id) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/orders/restaurant/' + id, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
}

export default fetchFullOrder;
