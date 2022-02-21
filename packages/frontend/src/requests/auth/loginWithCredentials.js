const loginWithCredentials = (form) => {
    return fetch(process.env.REACT_APP_URL_BACKEND + "/auth/login", {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export default loginWithCredentials;
