import React, {useEffect, useState} from 'react';
import {Column} from "./Column";
import "./createCategories.scss";
import {InputCategories} from "./inputCategories";
import fetchPlatesByRestaurants from "../../requests/fetchPlatesByRestaurants";
import resetUserConnected from "../../helpers/resetUserConnected";
import {userAtom} from "../../states/user";
import {useRecoilState} from "recoil";
import fetchCategoriesPlateByRestaurant from "../../requests/fetchCategoriesPlateByRestaurant";
import {DragDropContext} from "react-beautiful-dnd";
import {dropInSameColumn, dropIntoAnotherCategory} from "./dragAndDrop.mjs";

export function CreateCategories() {
    const [category, setCategory] = useState({name: '', icon: ''});
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [plates, setPlates] = useState([]);
    const [userState, setUserState] = useRecoilState(userAtom);
    useEffect(() => {
        fetchPlatesByRestaurants(userState.restaurant.id).then(async platesFromRequest => {
            if (platesFromRequest.status === 401) resetUserConnected(setUserState, history);
            setPlates(await platesFromRequest.json());
        });
        fetchCategoriesPlateByRestaurant(userState.restaurant.id).then(async categoriesFromRequest => {
            if (categoriesFromRequest.status === 401) resetUserConnected(setUserState, history);
            const categoriesFromRequestJson = await categoriesFromRequest.json();
            setCategories(categoriesFromRequestJson);
            setFilteredCategories(categoriesFromRequestJson);
        });
    }, []);

    function setFilteredColumn(e) {
        const idCategoryToShow = e;
        //case if the user select the first option (all categories)
        if (idCategoryToShow === '0') return setFilteredCategories(categories);
        const selectedCategory = categories.filter(currentCategory => currentCategory.id === parseInt(idCategoryToShow));
        // setSelectedCategory(idCategoryToShow);
        setFilteredCategories(selectedCategory);
    }

    function onDragEnd(result) {
        const {destination, source, draggableId} = result;
        if (!destination || dropInSameColumn(destination, source)) return;
        const plateAddedToCategory = dropIntoAnotherCategory(destination, source, categories, plates, draggableId);
        if (plateAddedToCategory) return setCategories(plateAddedToCategory);
    }

    return (

        <>
            <InputCategories confirmCategories={(categoriesAdded) => {
                setCategory(categoriesAdded);
            }}/>

            <section>
                <select onChange={(e) => setFilteredColumn(e.target.value)}>
                    <option value="0">Toutes les catégories</option>
                    {
                        categories
                            .map(category =>
                                <option key={category?.id} value={category?.id}>
                                    {category.name}
                                </option>)
                    }
                </select>
            </section>
            <DragDropContext onDragEnd={onDragEnd}>
                <section className="flex">
                    <section className="plate-selectors w-1/3">
                        <div className="columns-wrapper plates-selector">
                            <Column plates={plates} columnId={"mes-plats"} titleColumn={"Vos plats"}/>
                        </div>
                    </section>
                    <section className="columns-wrapper w-2/3">
                        {filteredCategories.map(currentCategory => {
                            return <Column key={currentCategory.id} icon={currentCategory?.icone}
                                           plates={currentCategory.plates}
                                           columnId={currentCategory.id}
                                           titleColumn={currentCategory.name}/>;
                        })}

                    </section>
                </section>
            </DragDropContext>
        </>
    );
}
