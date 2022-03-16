const fetchFullOrder= () => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/orders', {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
}

export default fetchFullOrder;
