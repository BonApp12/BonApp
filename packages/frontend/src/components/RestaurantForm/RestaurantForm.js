import React, { useState } from "react";
import editRestaurantInformations from "../../requests/restaurant/editRestaurantInformations";
import Loading from "../Loading/Loading";
import ErrorAlert from "../Alerts/ErrorAlert";

function RestaurantForm(props) {

    const [name, setName] = useState('');
    const [siren, setSiren] = useState('');
    const [contact_firstname, setFirstname] = useState('');
    const [contact_lastname, setLastname] = useState('');
    const [loading, setLoading] = useState('');


    const handleSubmit = (evt) => {
        setLoading('loading');
        editRestaurantInformations({name, siren, contact_firstname, contact_lastname}, props.restaurant.id)
            .then(res => {
                if (res.status >= 200 && res.status < 300) {
                    setLoading('success');
                    window.location.reload();
                } else {
                    setLoading('error');
                }
            })
            .catch(err => err);
        evt.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="m-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nom du restaurant</span>
                    </label>
                    <input placeholder={props.restaurant.name ? props.restaurant.name : "Nom du restaurant"} name="name" className="input input-bordered" type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Siren</span>
                    </label>
                    <input placeholder={props.restaurant.siren ? props.restaurant.siren : "Siren"} name="siren" className="input input-bordered" type="text" value={siren} onChange={e => setSiren(e.target.value)} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Prénom du responsable</span>
                    </label>
                    <input placeholder={props.restaurant.contact_firstname ? props.restaurant.contact_firstname : "Prénom du responsable"} name="contact_firstname" className="input input-bordered" type="text" value={contact_firstname} onChange={e => setFirstname(e.target.value)} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nom du responsable</span>
                    </label>
                    <input placeholder={props.restaurant.contact_lastname ? props.restaurant.contact_lastname : "Nom du responsable"} name="contact_lastname" className="input input-bordered" type="text" value={contact_lastname} onChange={e => setLastname(e.target.value)} />
                </div>
                <input type="submit" value="Envoyer" />
            </form>
            {loading === 'loading' ? <Loading /> : (loading === 'failed' ? <ErrorAlert errorMessage={"Il y a eu un problème."} /> : '' )}
        </div>
    )
}

export default RestaurantForm;