import React from "react";
import MainTab from "../../layouts/MainTab";
import ShowTable from "../../components/Table/ShowTable";

export default function Tables() {
    return (
        <>
            <MainTab libelleFirstTab={'Voir les Tables'}
                     firstContent={<ShowTable/>}
            />
        </>
    );
}
