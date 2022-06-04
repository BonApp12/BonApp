import React, {useEffect, useState} from "react";
import '../../assets/styles/autocomplete.css';
import stringSimilarity from 'string-similarity';
import fetchCategoriesPlate from "../../requests/fetchCategoriesPlate";
import {AiOutlineCloseCircle} from "react-icons/ai";

export default function ({closeModalEvent, openModal, confirmCategories}) {
    return (
        <>
            <div className={"modal " + (openModal && 'modal-open')}>
                {/*<div className={"modal modal-open"}>*/}
                <div className="modal-box">
                    <span className={'close-button'} onClick={closeModalEvent}>
                    <AiOutlineCloseCircle/>
                    </span>
                    <AddCategory confirmCategories={confirmCategories}/>
                </div>
            </div>
        </>
    );
}

export function AddCategory({confirmCategories}) {
    const [categoriesFromDb, setCategoriesFromDb] = useState({categories: [], onlyNameCategories: []});
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategoriesPlate().then(res => res.json()).then(res => setCategoriesFromDb({
            categories: res,
            onlyNameCategories: res.map(category => category.name)
        }));
    }, []);
    const [suggestions, setSuggestions] = useState({});

    function handleTypingSearch(e) {
        // Cette fonction permet de récuperer le reste du mots que l'on a tapé, on écrit le début et le reste du mot est deviné.
        if (e.target.value.length > 0) {
            const match = stringSimilarity.findBestMatch(e.target.value, categoriesFromDb.onlyNameCategories);
            setSuggestions(match);
        }
    }

    function autocomplete(e) {
        e.preventDefault();
        e.target.value = suggestions?.bestMatch.target;
    }

    function validatePrompt(e) {
        e.preventDefault();
        let newCategories = [...categories];
        if (e.target.value.length > 0) {
            if (suggestions?.bestMatch?.target === e.target.value) {
                const categoryToMatch = categoriesFromDb.categories[suggestions.bestMatchIndex];
                newCategories = [...categories, categoryToMatch];
                setCategories(newCategories);
            } else {
                newCategories = [...categories, {name: e.target.value}];
                setCategories(newCategories);
            }

            e.target.value = '';
            setSuggestions({});
        }
        confirmCategories(newCategories);
    }

    return (
        <>
            <div className={"relative autocomplete"}>
                <div className={'flex-1'}>
                    <div
                        className={'suggestion'}>
                        {suggestions?.bestMatch?.target?.length > 0 && "taper entrer pour la suggestion:"} {suggestions?.bestMatch?.target}
                    </div>
                    <input type="text" placeholder="Ajouter une catégorie"
                           onChange={handleTypingSearch}
                           onKeyDown={(e) => {
                               if (e.key === "Tab") return autocomplete(e);
                               if (e.key === 'Enter') return validatePrompt(e);
                           }}
                           className="border-0 mb-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
                <div>
                    <div className={'mt-5'}>
                        {categories.map((categoryBadge, index) => <>
                            <a key={index} data-tip="cliquer pour supprimer"
                               onClick={() => setCategories(categories.filter((currentPlate, i) => i !== index))}
                               className="badge badge-primary tooltip mr-2 cursor-pointer	hover:bg-red-700">
                                {categoryBadge.name}
                            </a>
                        </>)}
                    </div>
                </div>
            </div>
        </>
    )
        ;
}


