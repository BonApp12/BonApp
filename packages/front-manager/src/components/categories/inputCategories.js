import React, {useMemo, useState} from "react";
import {IconPicker} from "../IconPicker/IconPicker";

export const InputCategories = () => {
    const [category, setCategory] = useState({name: '', icon: ''});
    return (
        <div className="flex flex-wrap mt-4">
            <div className="w-1/2 mb-12 px-4">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-5"
                        htmlFor="grid-password"
                    >
                        Nom de la catégorie
                    </label>
                    <input
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm
                      shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={(e) => setCategory({...category, name: e.target.value})}
                    />
                </div>
            </div>
            {useMemo(() =>
                    <IconPicker setCategory={(e) => setCategory({...category, icon: (e)})}/>
                , [category])}
            {category.name.length > 0 &&
            <button className="btn btn-xs btn-outline btn-info mr-3" onClick={() => console.log(category)}>
                Confirmer
            </button>
            }
        </div>
    );
};
