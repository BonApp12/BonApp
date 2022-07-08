const findAllUserRestaurant = () => {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'user', {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export default findAllUserRestaurant;
