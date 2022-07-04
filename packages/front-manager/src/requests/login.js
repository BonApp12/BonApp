const login = (user) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'auth/login', {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({...user, requestFrom: 'RESTAURANT'}),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export default login;
