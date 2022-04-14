const fetchTeamMate = (idRestaurant) => {
    const url = process.env.REACT_APP_URL_BACKEND + '/restaurant/mon-equipe/';
    return fetch(url + idRestaurant, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
};

export default fetchTeamMate;
