import React, {useEffect, useState} from "react";
import * as dayjs from 'dayjs'
import 'dayjs/locale/fr'

// Requests
import fetchFullOrder from "requests/fetchFullOrder";
import updateOrder from "requests/updateOrder";

export default function CardTable() {

  let checkStatus, formattedDate;

  checkStatus = (status) => {
    if (status === 'to-do')
      return status === 'to-do';
  }

  formattedDate = (date) => {
    dayjs.locale('fr')
    return dayjs(date).format('DD/MM/YYYY à HH:mm')
  }


  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchFullOrder(1, 'to-do')
        .then(resOrder => resOrder.json())
        .then(orders => {
          setOrders(orders)
        })
  }, [orders])


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg light text-blueGray-700">
                Commandes en cours
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="text-center">
                <th className=
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                    whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  N° de commande
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                   whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Nom
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                  whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Prénom
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                  whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Date de commande
                </th>
                <th
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                  whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Plat
                </th>
                <th
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                  whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Statut
                </th>
                <th
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                  whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
            {orders.map((order)  => (
              <tr key={order.id}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                  <img
                    src="https://www.svgrepo.com/show/103223/fast-food.svg"
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  />{" "}
                  <span className="ml-3 font-bold text-blueGray-600">
                    {order.id}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.user.lastname}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.user.firstname}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {formattedDate(order.created_at)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {order.plate.name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className=
                         {checkStatus(order.status) ?
                             'fas fa-circle text-orange-500 mr-2'
                             :
                             'fas fa-circle text-green-500 mr-2'}
                  />
                  {checkStatus(order.status) ?
                      'En cours'
                      :
                      'Terminé'
                  }
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4t">
                  {checkStatus(order.status) ? (
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                              onClick={() => updateOrder(order.id)}>
                        Valider
                      </button>
                  ) : (
                      'Aucune action'
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}