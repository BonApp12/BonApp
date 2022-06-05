import React from "react";
import MainTab from "../../layouts/MainTab";
import ShowPlates from "../../components/Plate/ShowPlates";
import CreatePlate from "../../components/Plate/CreatePlate";

export default function Plates() {
    return (
        <>
            <MainTab libelleFirstTab={'Voir les plats à la carte'}
                     firstContent={<ShowPlates/>}
                     secondContent={<CreatePlate/>}
                     libelleSecondtab={"Ajouter un nouveau plat"}/>
        </>
    );
}
