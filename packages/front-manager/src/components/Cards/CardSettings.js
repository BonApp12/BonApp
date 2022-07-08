import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete';
import fetchAddressRestaurant from "../../requests/fetchAddressRestaurant";
import updateUser from "../../requests/updateUser";
import {toast} from "react-toastify";


export default function CardSettings() {
    const [user, setUser] = useRecoilState(userAtom);
    const [address, setAddress] = useState(user?.address);

    useEffect(() => {
        fetchAddressRestaurant(user.restaurant.id)
            .then(res => res.json())
            .then(restaurant => {
                setUser({...user, restaurant: {...restaurant}});
                setAddress(restaurant.address);
            })
        ;
    }, []);

    function handleAddress(place) {
        geocodeByPlaceId(place.value.place_id)
            .then(results => {
                setAddress({
                    ...address,
                    street: results[0].address_components[0].long_name + ' ' + results[0].address_components[1].long_name,
                    city: results[0].address_components[2].long_name,
                    postal_code: results[0].address_components[6].long_name,
                });
            })
            .catch(error => console.error(error));
    }

    function submit(e) {
        e.preventDefault();
        const updatedUser = {...user, restaurant: {...user.restaurant, address: address}};
        updateUser(updatedUser).then(res => res.json()).then(userUpdated => {
            setUser(userUpdated);
            if (userUpdated.restaurant.address) {
                toast("Et voilà 😎, votre profil est mis à jour !", {type: "success"});
                setAddress(userUpdated.restaurant.address);
            }
        }).catch(error => {
            toast("Une erreur est survenue, veuillez réessayer.", {type: "error"});
            console.error(error);
        });
    }

    return (
        <>
            <div
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Mon restaurant</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Information du compte
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email
                                    </label>
                                    <input
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={user?.email}
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        onChange={(e) => setUser({...user, firstname: e.target.value})}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={user?.firstname}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        onChange={(e) => setUser({...user, lastname: e.target.value})}
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={user?.lastname}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300"/>

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Adresse
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Address
                                    </label>
                                    <GooglePlacesAutocomplete
                                        apiOptions={{
                                            language: 'fr',
                                            region: 'fr',
                                        }}
                                        selectProps={{
                                            value: address?.street,
                                            onChange: (place) => handleAddress(place)
                                        }}
                                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}/>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        rue
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={address?.street}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Ville
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={address?.city}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Code postal
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue={address?.postal_code}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-outline btn-success"
                                    onClick={(e) => submit(e)}>
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
