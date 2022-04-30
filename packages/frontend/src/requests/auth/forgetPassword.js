import route from "../../router/route";

const forgetPassword = (email) => {
    return fetch(route.forgetPwd, {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}
export default forgetPassword;
