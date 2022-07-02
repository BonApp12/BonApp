import route from "../../router/route";

const registerUser = (form) => {
    return fetch(route.register, {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include'
    })
}

export default registerUser;