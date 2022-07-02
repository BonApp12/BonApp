const editRestaurantInformations = (form, idRestaurant) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + "/restaurant/" + idRestaurant, {
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
