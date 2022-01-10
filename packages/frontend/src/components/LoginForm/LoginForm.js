import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading/Loading";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";


function LoginForm() {

    const storedJwt = localStorage.getItem('token'); // Récupérer depuis le cookie directement.

    const [loading, setLoading] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useState(storedJwt || null);

    const handleSubmit = (evt) => {
        setLoading('logging');
        const form = {email: email, password: password};
        LoginWithCredentials(form)
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 401) {
                    setLoading('failed');
                    console.log('Login failed.');
                } else {
                    setLoading('success');
                    console.log('Login succeeded!')
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
            <h3>Bienvenue, veuillez vous connecter.</h3>
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
            {loading === "logging" ? <Loading /> : (loading === 'failed' ? <ErrorAlert errorMessage={"Les informations renseignées sont incorrectes"}/> : "")}
        </div>
    )
}

export default LoginForm;
