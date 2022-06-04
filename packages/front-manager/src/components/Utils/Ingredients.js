import React from "react";

export default function ({inputSearch, ingredients,setIngredients}) {
    return <>
        <input
            type="text"
            placeholder={"Appuyez sur Entrée pour ajouter un ingrédient"}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    inputSearch(e);
                    e.target.value = '';
                }
            }}
            className="border-0 mb-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
        {ingredients.map((ingredient, index) => <>
            <a key={index} data-tip="cliquer pour supprimer"
               onClick={() => setIngredients(ingredients.filter((ingredientToDelete, i) => i !== index))}
               className="badge badge-primary tooltip mr-2 cursor-pointer	hover:bg-red-700">
                {ingredient.name}
            </a>
        </>)}
    </>;
}
