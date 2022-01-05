const editRestaurantInformations = (form, idRestaurant) => {
    fetch("http://localhost:4000/restaurant/" + idRestaurant, {
        crossDomain: true,
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                return res;
            } else {
                console.log('Something went wrong?');
            }
        }).catch(err => err);
}

export default editRestaurantInformations;