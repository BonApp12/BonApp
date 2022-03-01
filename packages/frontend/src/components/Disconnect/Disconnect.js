import React from "react";
import disconnectCurrentUser from "../../requests/auth/disconnectCurrentUser";
import {useNavigate} from "react-router-dom";

const Disconnect = () => {
    const navigate = useNavigate();
    disconnectCurrentUser()
        .then(res => navigate('/login'));
    return (<></>)
}

export default Disconnect;
