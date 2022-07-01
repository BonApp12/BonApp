import route from "../../router/route";

const createOrder = (cart, restaurant, idTable, user = undefined) => {
    return fetch(route.createOrder, {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            cart,
            restaurant,
            user
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export default createOrder;