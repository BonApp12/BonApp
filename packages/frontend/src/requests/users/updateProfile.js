import route from "../../router/route";

const updateProfile = (user) => {
    return fetch(route.updateProfile, {
        crossDomain: true,
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            ...user,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}
export default updateProfile;
