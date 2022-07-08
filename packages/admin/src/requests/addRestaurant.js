const addRestaurant = (userRestaurant) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'user/restaurant', {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(userRestaurant),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export default addRestaurant;
