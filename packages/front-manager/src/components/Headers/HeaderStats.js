import React, {useEffect, useState} from "react";

// Requests

import fetchFullPlate from "requests/fetchFullPlate";
import fetchFullOrder from "requests/fetchFullOrder";
// import updateOrder from "requests/updateOrder";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {

  const [plates, setPlate] = useState(0)

  useEffect(() => {
    fetchFullPlate(31)
        .then(resPlate => resPlate.json())
        .then(plates => {
          setPlate(plates)
        })
  }, [plates])

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchFullOrder(31)
        .then(resOrder => resOrder.json())
        .then(orders => {
          setOrders(orders)
        })
  }, [orders])


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
                  statValue={orders.length}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statTitle="Nombre de plats"
                  statValue={plates.length}
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
