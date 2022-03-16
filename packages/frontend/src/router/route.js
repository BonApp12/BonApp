const router = {};

module.exports = Object.defineProperties(router, {
    register: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/register',
        writable: false
    },
    login: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/login',
        writable: false
    },
})