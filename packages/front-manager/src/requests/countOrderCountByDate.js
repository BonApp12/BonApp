const countOrderCountByDate = (restaurantId,date) => {
    let url = process.env.REACT_APP_URL_BACKEND + `/orders/count/${date}/restaurant/${restaurantId}`;
    return fetch(url, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        //credentials: 'include',
    });
};

export default countOrderCountByDate;
