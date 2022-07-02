const deleteUser = (idUser) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/user/' + idUser;
    return fetch(url, {
        crossDomain: true,
        method: 'DELETE',
        mode: 'cors',
        //,
    });
};

export default deleteUser;
