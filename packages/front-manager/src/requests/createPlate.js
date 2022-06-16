const createPlate = (body) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/';
    return fetch(url, {
        // crossDomain: true,
        method: 'POST',
        body,
        mode: 'cors',
        credentials: 'include',
    });
};

export default createPlate;
