import React from "react";
import {useForm} from "react-hook-form";
import postNewTeamMember from "../../requests/postNewTeamMember";
import {toast} from "react-toastify";
import roleEnum from "../Enum/RoleEnum";

export default function () {
    const {register: registerTeamMember, handleSubmit, reset, formState: {errors}} = useForm();
    const onSubmit = newUser => {
        postNewTeamMember(newUser).then(res => res.json()).then(response => {
            if (response.firstname) {
                toast.success("Le nouvel équipier a bien été ajouté, un email lui a été envoyé. 📧⚡");
                reset({lastname: "", firstname: "", email: "", role: ""});
                return;
            }
            toast.error(response.message);
        });
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Information de l'équipier
                </h6>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-full px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Adresse email de l'équipier
                            </label>
                            <input
                                {...registerTeamMember("email", {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                })}
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="jesse@example.com"
                            />
                            {errors.email?.type === 'pattern' && "Veuilez saisir un email valide"}
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Prénom de l'équipier
                            </label>
                            <input
                                type="text"
                                {...registerTeamMember("firstname", {minLength: 2, required: true})}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="Lucky"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Nom de l'équipier
                            </label>
                            <input
                                type="text"
                                {...registerTeamMember("lastname", {minLength: 2, required: true})}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="Jesse"
                            />
                        </div>

                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Nom de l'équipier
                            </label>
                            <select {...registerTeamMember("role")}
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            >
                                <option value={roleEnum.RESTAURANT_SERVER}>Serveur</option>
                                <option value={roleEnum.RESTAURANT_MANAGER}>Manager</option>
                                <option value={roleEnum.RESTAURANT_KITCHEN}>Cuisine</option>
                            </select>

                        </div>

                    </div>
                    <input type="hidden"
                           {...registerTeamMember("restaurant")}
                           value="1"/>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                            <button disabled={Object.keys(errors).length}
                                    className="btn btn-outline btn-success">Ajouter le
                                nouvel équipier
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </>
    );
}
