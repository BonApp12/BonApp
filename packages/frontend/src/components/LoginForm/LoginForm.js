import React, {useState} from "react";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";
import ErrorAlert from "../Alerts/ErrorAlert";
import Loading from "../Loading/Loading";

class LoginForm extends React.Component{
    _isMounter = false;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            logged: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleLoading(state) {
        this.setState({ logged: state })
    }

    handleSubmit(event){
        this.handleLoading('logging')
        LoginWithCredentials(this.state)
            .then(res => res.json())
            .then(res => {
                if (res.statusCode === 401){
                    this.handleLoading('failed');
                } else {
                    this.handleLoading('success');
                    console.log(res);
                }
            })
            .catch(err => {
                this.handleLoading('failed');
            })
        event.preventDefault();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <h3>Bienvenue, veuillez vous connecter.</h3>
                <form onSubmit={this.handleSubmit} className="m-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered" placeholder="exemple@doe.com" name="email" onChange={this.handleChange} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered" placeholder="********" name="password" onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-primary mt-2" type="submit">Connexion</button>
                </form>
                {this.state.logged === "logging" ? <Loading /> : (this.state.logged === 'failed' ? <ErrorAlert errorMessage={"Les informations renseignées ne sont pas correctes"} /> : "")}
            </div>
        )
    }
}

export default LoginForm;