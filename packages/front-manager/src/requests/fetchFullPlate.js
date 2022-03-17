const fetchFullPlate = () => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/plate', {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
}

export default fetchFullPlate;
