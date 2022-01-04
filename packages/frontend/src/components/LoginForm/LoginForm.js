import React from "react";
import LoginWithCredentials from "../../requests/auth/loginWithCredentials";


class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit(event){
        console.log(this.state.email);
        console.log(this.state.password);
        LoginWithCredentials(this.state);
        event.preventDefault();
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
            </div>
        )
    }
}

export default LoginForm;