import route from "../../router/route";

const updatePwd = (passwordObject) => {
    return fetch(route.updatePwd+'?token='+passwordObject.token, {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            password: passwordObject.password,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include'
    })
}
export default updatePwd;
