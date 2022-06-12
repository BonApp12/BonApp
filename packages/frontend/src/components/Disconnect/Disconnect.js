import {useEffect} from "react";
import disconnectCurrentUser from "../../requests/auth/disconnectCurrentUser";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from 'recoil';
import {userAtom} from '../../states/user';
import {toast} from "react-toastify";

const Disconnect = () => {
    const navigate = useNavigate();
    const [userState,setUserState] = useRecoilState(userAtom);

    useEffect(() => {
        userState !== null && navigate('/');
    },[userState]);

    disconnectCurrentUser()
        .then(() => {
            setUserState(null);
            navigate('/');
            toast.success('Déconnexion réussie');
            return false;
        });
    return (<></>)
}

export default Disconnect;
