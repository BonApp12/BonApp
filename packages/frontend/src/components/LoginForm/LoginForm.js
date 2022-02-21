import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";
import { Navigate } from "react-router-dom";
import isUserConnected from "../../requests/auth/isUserConnected";

function LoginForm() {

    isUserConnected().then(r => console.log(r));
    const storedIsConnected = localStorage.getItem('isConnected'); // Récupérer depuis le cookie directement.

    const [loading, setLoading] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isConnected, setIsConnected] = useState(storedIsConnected || null);
    const handleSubmit = (evt) => {
        setLoading('logging');
        const form = {email: email, password: password};
        LoginWithCredentials(form)
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 400) {
                    setLoading('failed');
                } else {
                    setLoading('success');
                    setIsConnected('true');
                    localStorage.setItem('isConnected', 'true'); // Permets au front de savoir quand un utilisateur est connecté ou pas.
                }
            })
            .catch(err => {
                setLoading('failed');
                console.log(err);
            })

        evt.preventDefault();
    }

    return (
        <div>
            {isConnected ? <Navigate to={{pathname: '/already-logged'}} /> : ""}
            <h3>Eoh, veuillez vous connecter.</h3>
            <form onSubmit={handleSubmit} className="m-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" className="input input-bordered" placeholder="exemple@doe.com" name="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" className="input input-bordered" placeholder="********" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-primary mt-2" type="submit">Connexion</button>
            </form>
            {loading === "logging" ? <Loading /> : (loading === 'failed' ? <ErrorAlert errorMessage={"Les informations renseignées sont incorrectes. Veuillez réessayer."}/> : "")}
        </div>
    )
}

export default LoginForm;
