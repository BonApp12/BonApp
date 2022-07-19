import React from "react";
import MainTab from "../../layouts/MainTab";
import {CreateCategories} from "../../components/categories/CreateCategories";

export default function Categories() {
    console.log('Categories');
    return (
        <>
            <MainTab libelleFirstTab={'Ajouter de nouvelles catégories'}
                     firstContent={<CreateCategories />}
            />

        </>
    );
}
