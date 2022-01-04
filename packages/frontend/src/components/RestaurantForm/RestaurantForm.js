import React from "react";
import editRestaurantInformations from "../../requests/restaurant/editRestaurantInformations";

class RestaurantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            siren: "",
            contact_firstname: "",
            contact_lastname: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        editRestaurantInformations(this.state, this.props.restaurant.id);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="m-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nom du restaurant</span>
                    </label>
                    <input placeholder={this.props.restaurant.name ? this.props.restaurant.name : "Nom du restaurant"} name="name" className="input input-bordered" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Siren</span>
                    </label>
                    <input placeholder={this.props.restaurant.siren ? this.props.restaurant.siren : "Siren"} name="siren" className="input input-bordered" type="text" value={this.state.siren} onChange={this.handleChange} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Prénom du responsable</span>
                    </label>
                    <input placeholder={this.props.restaurant.contact_firstname ? this.props.restaurant.contact_firstname : "Prénom du responsable"} name="contact_firstname" className="input input-bordered" type="text" value={this.state.contact_firstname} onChange={this.handleChange} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nom du responsable</span>
                    </label>
                    <input placeholder={this.props.restaurant.contact_lastname ? this.props.restaurant.contact_lastname : "Nom du responsable"} name="contact_lastname" className="input input-bordered" type="text" value={this.state.contact_lastname} onChange={this.handleChange} />
                </div>
                <input type="submit" value="Envoyer" />
            </form>
        )
    }
}
export default RestaurantForm;