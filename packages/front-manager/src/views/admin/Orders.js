import React from "react";

// Components
import CardTable from "../../components/Cards/CardTable";
import CompletedOrders from "../../components/Cards/CompletedOrders"
import MainTab from "../../layouts/MainTab";

export default function Orders() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <MainTab libelleFirstTab={"Commandes en cours"}
                   firstContent={<CardTable/>}
                   secondContent={<CompletedOrders/>}
                   libelleSecondtab={"Commandes terminées"}
                   />
        </div>
      </div>
    </>
  );
}
