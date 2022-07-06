const deletePlateRequest = (idPlate) => {
    let url = process.env.REACT_APP_URL_BACKEND + 'plate/' + idPlate;
    return fetch(url, {
        crossDomain: true,
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
    });
};

export default deletePlateRequest;
