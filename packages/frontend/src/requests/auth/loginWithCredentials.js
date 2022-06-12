import route from "../../router/route";

const loginWithCredentials = (form,device='web') => {
    return fetch(route.login, {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({...form, type: device}),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export default loginWithCredentials;
