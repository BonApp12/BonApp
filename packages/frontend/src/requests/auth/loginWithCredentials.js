const loginWithCredentials = (form) => {
    fetch("http://localhost:4000/auth/login", {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
}

export default loginWithCredentials;