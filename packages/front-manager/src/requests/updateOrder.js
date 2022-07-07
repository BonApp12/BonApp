export default function updateOrder(idOrder, status) {
    return fetch(process.env.REACT_APP_URL_BACKEND + 'orders/' + idOrder, {
        crossDomain: true,
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            status
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })

}
