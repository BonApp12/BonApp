import route from "../../router/route";

const orderByUser = (user) => {
    return fetch(route.ordersUser+user, {
        crossDomain: true,
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        //
    })
}
export default orderByUser;
