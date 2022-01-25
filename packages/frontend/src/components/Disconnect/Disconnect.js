import React from "react";
import disconnectCurrentUser from "../../requests/auth/disconnectCurrentUser";

const Disconnect = () => {
    let storageIsConnected = localStorage.getItem('isConnected');
    if (storageIsConnected) {
        localStorage.removeItem('isConnected');
    }
    disconnectCurrentUser()
        .then(res => {
            console.log(res);
            if (res.status === 201) {
                if (storageIsConnected) {
                    localStorage.removeItem('isConnected');
                }
                window.location.replace('http://localhost:3000/login');
            }
        });

    return(<h1>Disconnecting - Check console to see if successful !</h1>);
}

export default Disconnect;
