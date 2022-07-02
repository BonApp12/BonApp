import route from "../../router/route";

const loginWithCredentials = (form) => {
    return fetch(route.login, {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({...form, requestFrom: 'CLIENT'}),
        headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include'
    })
}

export default loginWithCredentials;
