import React, {useEffect, useState} from "react";
import fetchFullPlate from "requests/fetchFullPlate";
import fetchFullOrder from "requests/fetchFullOrder";
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {

  const [plates, setPlate] = useState(0)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchFullPlate(1).then(async resPlate => setPlate(await resPlate.json()))
    fetchFullOrder(1, 'only-orders').then(async resOrder => setOrders(await resOrder.json()))
  }, [])

  return (
    <>
      {/* Header */}
      <div className="relative bg-orange-400 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                    statTitle="Nombre de commandes"
                    statValue={`${orders.length}`}
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                    statTitle="Nombre de plats"
                    statValue={`${plates.length}`}
                    statIconName="fas fa-hamburger"
                    statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statTitle="Plat le plus commandé"
                  statValue="Grec"
                  statIconName="fas fa-grin-hearts"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}