import React from "react";
import disconnectCurrentUser from "../../requests/auth/disconnectCurrentUser";

const Disconnect = () => {
    let storageIsConnected = localStorage.getItem('isConnected');
    if (storageIsConnected) {
        localStorage.removeItem('isConnected');
    }
    disconnectCurrentUser()
        .then(r => r.json())
        .then(r => {
            console.log(r);
        });

    return(<h1>Disconnecting</h1>);
}

export default Disconnect;
