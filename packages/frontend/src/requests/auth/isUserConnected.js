const isUserConnected = () => {
    return fetch(process.env.REACT_APP_URL_BACKEND + '/auth/isConnected', {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        //,
    });
}

export default isUserConnected;
