import googleAuth from "../requests/auth/googleAuth";
import {userAtom} from "../states/user";
import {useSetRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function useGoogleAuthentication() {
    const setUserState = useSetRecoilState(userAtom);
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        if ('accessToken' in response) {
            const accessToken = response.accessToken;
            googleAuth(accessToken)
                .then(res => res.json())
                .then(responseGoogle => {
                    if(responseGoogle.statusCode === 200) {
                        setUserState(responseGoogle.user);
                        toast.success('Connexion réussie');
                        navigate('/profile');
                    }
                })
        }
    }

    return {
        handleSuccess,
    }
}

export default useGoogleAuthentication;