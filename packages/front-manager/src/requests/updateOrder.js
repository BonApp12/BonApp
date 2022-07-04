export default function updateOrder(idOrder) {

    return fetch(process.env.REACT_APP_URL_BACKEND + 'orders/' + idOrder, {
        crossDomain: true,
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
    })

}
