const createPlate = (body) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/plate';
    return fetch(url, {
        // crossDomain: true,
        method: 'POST',
        body,
        mode: 'cors',
        //,
    });
};

export default createPlate;
