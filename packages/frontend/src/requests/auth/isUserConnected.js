const isUserConnected = () => {
    return fetch ('http://localhost:4000/auth/isConnected', {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    });
}

export default isUserConnected;