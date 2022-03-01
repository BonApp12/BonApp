import React from "react";
import disconnectCurrentUser from "../../requests/auth/disconnectCurrentUser";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from 'recoil';
import {userAtom} from '../../states/user';

const Disconnect = () => {
    const navigate = useNavigate();
    const [userState,setUserState] = useRecoilState(userAtom);

    disconnectCurrentUser()
        .then(res => {
            setUserState('');
            navigate('/login');
        });
    return (<></>)
}

export default Disconnect;
