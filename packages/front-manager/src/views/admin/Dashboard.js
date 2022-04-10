import React from "react";

// Components
import CardChart from "components/Cards/CardChart.js";
import chartConfigEnum from "../../components/Enum/ChartConfigEnum";

export default function Dashboard() {
  return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardChart
                identifier="nb_orders"
                backgroundColor="bg-blueGray-700"
                titleColor='text-blueGray-200'
                subTitleColor='text-blueGray-200'
                title="Nombre de commandes"
                subTitle="Nombre de commandes enregistrées"
                config={chartConfigEnum}
            />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardChart
                identifier="nb_views"
                backgroundColor="bg-white"
                titleColor='text-blueGray'
                subTitleColor='text-blueGray'
                title="test"
                subTitle="Nombre de commandes enregistrées"
                config={chartConfigEnum}
            />
          </div>
      </div>
    </>
  );
}
