const postNewTeamMate = (data) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/auth/register';
    return fetch(url, {
        body: JSON.stringify(data),
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    });
};

export default postNewTeamMate;
