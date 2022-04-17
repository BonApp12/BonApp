const createPlate = (plate) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/plate';

    return fetch(url, {
        crossDomain: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...plate
        }),
        mode: 'cors',
        credentials: 'include',
    });
};

export default createPlate;
