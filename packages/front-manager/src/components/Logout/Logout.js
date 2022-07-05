import logout from "../../requests/logout";
import {useHistory} from "react-router-dom";
import {useSetRecoilState} from 'recoil';
import {userAtom} from '../../states/user';
import {toast} from "react-toastify";

const Logout = () => {
    const history = useHistory();
    const setUserState = useSetRecoilState(userAtom);

    logout()
        .then(() => {
            console.log('logout');
            setUserState(null);
            history.push('/');
            toast.success('Déconnexion réussie');
            return false;
        });
    return (<></>);
};

export default Logout;
