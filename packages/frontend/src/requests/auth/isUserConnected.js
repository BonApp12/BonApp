const isUserConnected = () => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/auth/isConnected', {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    });
}

export default isUserConnected;
