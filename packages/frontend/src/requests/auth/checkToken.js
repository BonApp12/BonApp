import route from "../../router/route";

const checkToken = (token) => {
    return fetch(route.checkToken+'?token='+token, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        //
    })
}
export default checkToken;
