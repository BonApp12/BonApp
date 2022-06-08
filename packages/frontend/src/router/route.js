module.exports = Object.defineProperties({}, {
    register: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/register',
        writable: false
    },
    isConnected: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/isConnected',
        writable: false
    },
    login: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/login',
        writable: false
    },
    forgetPwd: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/forget-password',
        writable: false
    },
    checkToken: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/check-token',
        writable: false
    },
    updatePwd: {
        value: process.env.REACT_APP_URL_BACKEND + '/auth/update-password',
        writable: false
    },
    google: {
        value: process.env.REACT_APP_URL_BACKEND + '/google',
        writable: false
    },
    updateProfile: {
        value: process.env.REACT_APP_URL_BACKEND + '/user/update',
        writable: false
    },
    ordersUser: {
        value: process.env.REACT_APP_URL_BACKEND + '/orders/user/',
        writable: false
    },
})