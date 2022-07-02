const updateUser = (teamMember) => {
    let url = process.env.REACT_APP_URL_BACKEND + '/user/' + teamMember.id;

    return fetch(url, {
        crossDomain: true,
        method: 'PATCH',
        body: JSON.stringify(teamMember),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
    });
};

export default updateUser;
