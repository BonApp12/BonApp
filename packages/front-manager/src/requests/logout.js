const logout = () => {
    return fetch(process.env.REACT_APP_URL_BACKEND+'auth/logout', {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })
}
export default logout;
