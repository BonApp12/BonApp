import React, {useContext, useEffect, useState} from "react";
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

import fetchFullOrder from "../../requests/fetchFullOrder";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import OrderStatusEnum from "../Enum/OrderStatusEnum";
import resetUserConnected from "../../helpers/resetUserConnected";
import Modal from "../Modal/Modal";
import {useHistory} from "react-router-dom";
import ReactPaginate from "react-paginate";



export default function CompletedOrders(){

    const [orders, setOrders] = useState([]);
    const [modalInfo, setModalInfo] = useState(null);
    const [orderReceived, setOrderReceived] = useState(false);

    // Pagination
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    const [userState, setUserState] = useRecoilState(userAtom);   
    const history = useHistory();

    let checkStatus, formattedDate;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orders.length;
        setItemOffset(newOffset);
    }

    checkStatus = (status) => {
        return status === OrderStatusEnum.COMPLETED;
    };

    formattedDate = (date) => {
        dayjs.locale('fr');
        return dayjs(date).format('DD/MM/YYYY à HH:mm');
    }


    
    useEffect(() => {
        fetchFullOrder(userState?.restaurant.id, OrderStatusEnum.COMPLETED).then(res => {
            if (res.status === 401) return resetUserConnected(setUserState, history);
            return res.json();
        }).then(resOrder => {
            setOrders(resOrder);
            setOrderReceived(false);
        });
        return function cleanup() {
            setOrders([]);
        }
    }, [orderReceived]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemsPerPage));
    }, [orders, itemOffset, itemsPerPage]);

    function computeTotal(orderPlates) {
        let total = 0;
        orderPlates.forEach(plate => {
            total += (plate.price * plate.quantity);
        });
        return total;
    }


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-lg light text-blueGray-700">
                                Commandes terminées
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr className="text-center">
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
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
                                Table
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
                                Total
                            </th>
                            <th
                                className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0
                  whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            >
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems?.map((order) => (
                            <tr key={order.id} className="text-center">
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4
                text-left flex items-center">
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
                                    {order.user?.lastname || "Anonyme"}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {order.user?.firstname}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {order.table?.libelle}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {formattedDate(order.created_at)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <a href="#my-modal-2" className={"btn btn-primary btn-xs mr-1"}
                                       onClick={() => {
                                           setModalInfo(order.orderPlates);
                                       }}>Détails</a>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <i className=
                                           {order.status === OrderStatusEnum.TODO ?
                                               'fas fa-circle text-orange-500 mr-2'
                                               :
                                               'fas fa-circle text-green-500 mr-2'}
                                    />
                                    Délivrée
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <p>
                                        {computeTotal(order.orderPlates)}
                                        <span> €</span>
                                    </p>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    Aucune action
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        className={'btn-group'}
                        previousLabel="<"
                        breakClassName={'btn rounded-none'}
                        pageLinkClassName={"btn rounded-none"}
                        nextLinkClassName={"btn rounded-none"}
                        previousLinkClassName={"btn rounded-none"}
                        activeLinkClassName={"btn-primary"}
                    />
            <Modal buttonClass={"btn-primary"}>
                <div className="modal-header">
                    <h1 className="text-xl font-bold">Détails de la commande</h1>
                    {
                        modalInfo !== null && modalInfo.length > 0 ?
                            modalInfo?.map((plate) => {
                                return (
                                    <div key={plate.id} className="mt-3">
                                        <p>{plate.plate.name}
                                            <b> x {plate.quantity}</b> - <b>{plate.price * plate.quantity} €</b></p>
                                    </div>
                                );
                            })
                            :
                            <p>Aucun plat</p>
                    }
                </div>
                <div className=" modal-action">
                    <a href="#" className="btn">Fermer</a>
                </div>
            </Modal>
        </>
    );
}