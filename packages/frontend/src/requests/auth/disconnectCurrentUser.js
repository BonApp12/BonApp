const disconnectCurrentUser = () => {
    return fetch('http://localhost:4000/auth/logout', {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })
}
export default disconnectCurrentUser;