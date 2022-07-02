const countBestPlateRequest = (restaurantId, type) => {
    let url = process.env.REACT_APP_URL_BACKEND + `/order-plate/restaurant/${restaurantId}/best-plate/${type}`;
    return fetch(url, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default countBestPlateRequest;
