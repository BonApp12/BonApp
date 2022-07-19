import React, {useState} from 'react';
import {Column} from "./Column";
import "./createCategories.scss";
import {InputCategories} from "./inputCategories";

export function CreateCategories() {
    const [category, setCategory] = useState({name: '', icon: ''});
    return (
        <>
            <InputCategories confirmCategories={(categoriesAdded) => {
                setCategory(categoriesAdded);
            }}/>
            <section className="flex">
                <section className="plate-selectors w-1/3">
                    <div className="columns-wrapper plates-selector">
                        <Column titleColumn={"Vos plats"}/>
                    </div>
                </section>
                <section className="columns-wrapper w-2/3">
                    <Column titleColumn={"une Categorie"}/>
                    <Column titleColumn={"une Categorie"}/>
                    <Column titleColumn={"une Categorie"}/>
                    <Column titleColumn={"une Categorie"}/>
                    <Column titleColumn={"une Categorie"}/>
                    <Column titleColumn={"une Categorie"}/>
                    <Column titleColumn={"une Categorie"}/>
                    <Column titleColumn={"une Categorie"}/>

                </section>
            </section>
        </>
    );
}
