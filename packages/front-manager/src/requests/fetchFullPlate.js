const fetchFullPlate = (idPlate) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/plate/restaurant/' + idPlate, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default fetchFullPlate;
