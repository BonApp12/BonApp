const editRestaurantInformations = (form, idRestaurant) => {
    return fetch("http://localhost:4000/restaurant/" + idRestaurant, {
        crossDomain: true,
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default editRestaurantInformations;