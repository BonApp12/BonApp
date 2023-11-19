import React, { useContext, useEffect, useState } from "react";
import MainTab from "layouts/MainTab";
import fetchFullOrder from "requests/fetchFullOrder";
import OrderStatusEnum from "components/Enum/OrderStatusEnum";
import resetUserConnected from "helpers/resetUserConnected";
import { useRecoilState } from "recoil";
import { userAtom } from "../../states/user";
import { SocketContext } from "contexts/socket";
import { toast } from "react-toastify";
import updateOrder from "requests/updateOrder";


export default function Kitchen() {

    const [orders, setOrders] = useState([]);
    const [orderReceived, setOrderReceived] = useState(false);
    const [userState, setUserState] = useRecoilState(userAtom);
    const [isReady, setIsReady] = useState(false);

    const socket = useContext(SocketContext);

    const updateOrderStatus = (idOrder, status) => {
        status = OrderStatusEnum.READY;
        updateOrder(idOrder, status).then((res) => res.json())
            .then((result) => {
                socket.emit('updateOrder', {order: result.raw[0]});
                setOrderReceived(true);
            });
    }

    const setPlateReady = (e) => {
        e.currentTarget.classList.toggle('bg-green-500');
    }

    useEffect(() => {
        socket.on('orderCreated', () => {
            setOrderReceived(true);
            toast.success('Une nouvelle commande a été créée !');
        });
    }, []);

    useEffect(() => {
        socket.emit('StaffJoinRestaurantRoom', {user: userState});
    }, [socket]);

    useEffect(() => {
        fetchFullOrder(userState?.restaurant.id, OrderStatusEnum.TODO).then(res => {
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

    return (
        <>
            <section>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                    <div className="relative mx-auto max-w-3xl text-center">
                        <span
                            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/10"
                        ></span>

                        <h2
                            className="relative inline-block bg-white px-4 text-center text-2xl font-bold"
                        >
                            Commandes en cours
                        </h2>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                    {orders.map((order) => (
                        <div className="relative block border border-gray-100 ml-2 mr-2" key={order.id}>
                                { /* <button
                                    type="button"
                                    className="absolute right-4 top-4 rounded-full bg-black p-2 text-white"
                                >
                                    <span className="sr-only">Wishlist</span>
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        ></path>
                                    </svg>
                    </button> 
                    <img
                                    alt="Toy"
                                    src="https://images.unsplash.com/photo-1603356033288-acfcb54801e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                    className="h-56 w-full object-contain"
                                /> */}

                                <div className="p-6">
                                <h3 className="mt-1">Commande {order.id}</h3>
                                    {order.orderPlates.map((plate) => (
                                        <p className="font-bold text-lg text-black" key={plate.id}
                                            onClick={setPlateReady}>{plate.plate.name} (quant. {plate.quantity})</p>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => updateOrderStatus(order.id, order.status)}
                                        className="mt-4 flex w-full items-center justify-center rounded-sm bg-green-500 px-8 py-4"
                                    >
                                        <i className='fas fa-check text-green-200 mr-2'/>
                                    </button>
                                </div>
                        </div>
                    ))}
                </div>

                    <div className="mt-4 text-center">
                        <button type="button" className="text-xs text-gray-500 underline">
                            Paramètres
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}