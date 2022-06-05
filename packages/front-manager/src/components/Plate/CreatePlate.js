import React, {useState} from "react";
import {useForm} from "react-hook-form";
import createPlate from "../../requests/createPlate";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useRecoilValue} from "recoil";
import {userAtom} from "../../states/user";
import Ingredients from "../Utils/Ingredients";
import {AddCategory} from "../Utils/PlateCategories";

export default function () {
    const {register: registerTeamMember, handleSubmit, reset, formState: {errors}} = useForm();
    const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('ENTREE');
    const userState = useRecoilValue(userAtom);


    const onSubmit = newPlate => {
        newPlate = {
            ...newPlate,
            description: description || '',
            restaurant: JSON.stringify({id: userState.restaurant.id}),
            type: JSON.stringify(type),
            ingredients: JSON.stringify(ingredients),
            categories: JSON.stringify(categories),
            image
        };
        const formData = toFormData(newPlate);
        createPlate(formData)
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

    function toFormData(newPlate) {
        const formData = new FormData();
        Object.keys(newPlate).forEach(function (key) {
            formData.append(key, newPlate[key]);
        });
        return formData;
    }

    function addType(e) {
        setType(e.target.value);
    }

    function addIngredient(e) {
        e.preventDefault();
        if (e.key === 'Enter')
            setIngredients([...ingredients, {name: e.target.value}]);
        e.target.value = '';
    }

    function upload(e) {
        const files = e.target.files;
        setImage(files[0]);
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
                                    step="any"
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
                                <select
                                    value={'ENTREE'}
                                    onChange={addType}
                                    className="border-0 mb-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    name=""
                                    id="">
                                    <option value="ENTREE">Entrée</option>
                                    <option value="PLAT">Plat</option>
                                    <option value="DESSERT">Dessert</option>
                                </select>
                            </div>
                            <div className="inline-block w-full mb-3 mr-5">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Ajouter des ingrédients
                                </label>
                                <Ingredients ingredients={ingredients}
                                             setIngredients={(newIngredients) => setIngredients(newIngredients)}
                                             inputSearch={(e) => {
                                                 addIngredient(e);
                                             }}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="w-full lg:w-full px-4">
                        <div className="flex">
                            <div className="inline-block w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Ajouter des catégories aux plats
                                </label>
                                <AddCategory
                                    confirmCategories={(categoriesAdded) => {
                                        setCategories(categoriesAdded);
                                    }}
                                />

                            </div>
                            <div className="relative w-full mb-3 tooltip"
                                 data-tip="Une photo au format carré est vivement conseillé">
                                <input type="file"
                                       accept="image/png, image/gif, image/jpeg"
                                       name={'image'}
                                       onChange={(e) => upload(e)}
                                />
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
