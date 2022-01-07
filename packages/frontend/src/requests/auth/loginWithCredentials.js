const loginWithCredentials = (form) => {
    return fetch("http://localhost:4000/auth/login", {
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