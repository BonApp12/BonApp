const updateUser = (equipier) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/user/' + equipier.id;

    return fetch(url, {
        crossDomain: true,
        method: 'PATCH',
        body: JSON.stringify(equipier),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
    });
};

export default updateUser;
