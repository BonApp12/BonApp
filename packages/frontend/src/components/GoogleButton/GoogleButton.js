import React from 'react';
import GoogleLogin from 'react-google-login';
import useGoogleAuthentication from "../../hooks/useGoogleAuthentication";

function GoogleButton({setLoadingGoogle}) {
    const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
    const { handleSuccess } = useGoogleAuthentication();

    return (
        <div onClick={() => setLoadingGoogle(true)}>
            <GoogleLogin
                clientId={clientId}
                buttonText="Connectez vous avec Google"
                onSuccess={handleSuccess}
            />
        </div>
    );
}

export default GoogleButton;