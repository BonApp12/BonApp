import React, {useState} from "react";
import {useForm} from "react-hook-form";
import createPlate from "../../requests/createPlate";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function () {
    const {register: registerTeamMember, handleSubmit, reset, formState: {errors}} = useForm();
    const [ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState('');


    const onSubmit = newPlate => {
        //TODO: Ajouter le vrai restaurant quand la connexion sera mise en place sur cette partie.
        newPlate = {
            ...newPlate, ingredients, description: description || '', restaurant: {id: 1}
        }
        ;
        createPlate(newPlate)
            .then(res => res.json())
            .then(response => {
                if (response.id) {
                    toast.success("Le nouveau plat a bien été ajouté 🍝");
                    reset({name: "", ingredient: ""});
                    setIngredients([]);
                    return;
                }
                toast.error(response.message);
            });
    };

    function addIngredient(e) {
        if (e.key === 'Enter')
            setIngredients([...ingredients, {name: e.target.value}]);
        e.target.value = '';
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Création d'un nouveau plat
                </h6>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-full px-4">
                        <div className="flex">
                            <div className="w-full mb-3 mr-5 ">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Nom du plat
                                </label>
                                <input
                                    {...registerTeamMember("name", {required: true, minLength: 1})}
                                    type="text"
                                    placeholder="Nom du plat"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                            </div>
                            <div className="w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Prix (en €)
                                </label>
                                {/*TODO: mutualiser les inputs avec le component créer par Youcef*/}
                                <input
                                    {...registerTeamMember("price", {required: true, value: "0", min: 0,})}
                                    type="number"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                                {errors.price?.type === 'min' && "Veuilez saisir un prix valide"}
                            </div>
                        </div>

                    </div>
                    <div className="w-full lg:w-full px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Description
                            </label>
                            <ReactQuill theme="snow" value={description} onChange={setDescription}/>
                        </div>
                    </div>
                    <div className="w-full lg:w-full px-4">
                        <div className="flex">

                            <div className="relative w-full mb-3 mr-5">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Catégorie du plat
                                </label>
                                {/*TODO: FAIRE UNE RECHERCHE AVEC AUTOCOMPLETION*/}

                                <select
                                    className="border-0 mb-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name=""
                                    id="">
                                    <option value="1">Entrée</option>
                                    <option value="2">Plat</option>
                                    <option value="3">Dessert</option>
                                </select>
                            </div>
                            <div className="inline-block w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Ajouter des ingrédients
                                </label>
                                {/*TODO: FAIRE UNE RECHERCHE AVEC AUTOCOMPLETION*/}
                                <input
                                    type="text"
                                    placeholder={"Appuyez sur Entrée pour ajouter un ingrédient"}
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && e.target.value.trim().length && addIngredient(e);
                                    }}
                                    className="border-0 mb-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                                {ingredients.map((ingredient, index) => <>
                                    <a data-tip="cliquer pour supprimer" key={index}
                                       onClick={() => setIngredients(ingredients.filter((ingredientToDelete, i) => i !== index))}
                                       className="badge badge-primary tooltip mr-2 cursor-pointer	hover:bg-red-700">
                                        {ingredient.name}
                                    </a>
                                </>)}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="w-full mb-3">
                            <button
                                type={'submit'}
                                className="btn btn-outline btn-success">Ajouter le
                                nouveau Plat
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </>
    );
}
