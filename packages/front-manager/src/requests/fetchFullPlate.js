const fetchFullPlate = (id) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/plate/restaurant/' + id, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
}

export default fetchFullPlate;
