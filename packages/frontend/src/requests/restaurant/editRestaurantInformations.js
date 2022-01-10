const editRestaurantInformations = (form, idRestaurant) => {
    return fetch("http://localhost:4000/restaurant/" + idRestaurant, {
        crossDomain: true,
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
}
export default editRestaurantInformations;