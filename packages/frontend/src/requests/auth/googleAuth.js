import route from "../../router/route";

const googleAuth = (accessToken) => {
    return fetch(route.google, {
        crossDomain: true,
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
            token: accessToken
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include'
    });
}

export default googleAuth;
