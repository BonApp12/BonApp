export default function updateOrder(id) {

    return fetch(process.env.REACT_APP_URL_BACKEND + '/orders/' + id, {
        crossDomain: true,
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
    }).then((result) => {result.json()})

}
