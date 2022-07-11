import React, {useEffect, useState} from "react";
import orderByUser from "../../requests/orders/orderByUser";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import plateImg from '../../img/plate.jpg';
import starter from '../../img/foodCategory/starter.png';
import dish from '../../img/foodCategory/dish.png';
import dessert from '../../img/foodCategory/dessert.png';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import HeaderAccount from "../../components/HeaderAccount/HeaderAccount";
import LoadingPage from "../../components/Loading/LoadingPage";
import {AiOutlineCheck, AiOutlineDownload} from "react-icons/ai";
import resetUserConnected from "../../helpers/resetUserConnected";
import {useNavigate} from "react-router-dom";
import {GrCircleInformation} from "react-icons/gr";
import {Information} from "../../components/overlay/information";
import generatePdf from "../../requests/orders/generatePdf";
import PlateType from "../../enum/PlateType";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function OrdersAccount() {
    const [orders, setOrders] = useState([]);
    const [filterOrder, setFilterOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userState, setUserState] = useRecoilState(userAtom);
    const [modalManagement, setModalManagement] = useState({isOpen: false, data: null});
    const navigate = useNavigate();

    useEffect(() => {
        userState === null && navigate('/');
        if (userState !== null) {
            setLoading(true);
            orderByUser(userState.id)
                .then(async (res) => {
                    if (res.status === 401) resetUserConnected(setUserState, navigate);
                    setLoading(false);
                    setOrders(await res.json());
                });
        }

        return function cleanup() {
            setLoading(false);
            setOrders([]);
            setFilterOrder([]);
        };
    }, []);

    const activeBtn = (event, statusOrder) => {
        const isCheck = event.currentTarget.classList.contains('bg-white');

        if (isCheck) {
            event.currentTarget.classList.replace('bg-white', 'bg-orange-500');
            event.currentTarget.classList.replace('text-orange-500', 'text-white');
            event.currentTarget.querySelector('span').classList.remove('hidden');
            filterOrder.push(statusOrder);
        } else {
            event.currentTarget.classList.replace('bg-orange-500', 'bg-white');
            event.currentTarget.classList.replace('text-white', 'text-orange-500');
            event.currentTarget.querySelector('span').classList.add('hidden');
            filterOrder.splice(filterOrder.indexOf(statusOrder), 1);
        }
        setFilterOrder([...filterOrder]);
    };

    if (!loading) {
        return (
            <div className="px-5">
                <HeaderAccount url={'/profile'} title={'Mes dernières commandes'}/>
                <div className="flex flex-row justify-center space-x-2 mb-5">
                    <button className="btn text-orange-500 bg-white border-orange-500 gap-x-2"
                            onClick={(e) => activeBtn(e, 'to-do')}>En cours <span
                        className="hidden text-white"><AiOutlineCheck size={20}/></span></button>
                    <button className="btn text-orange-500 bg-white border-orange-500 gap-x-2"
                            onClick={(e) => activeBtn(e, 'completed')}>Passée <span
                        className="hidden text-white"><AiOutlineCheck size={20}/></span></button>
                </div>
                {
                    orders.length >= 1 ? orders.map((order, index) =>
                        (
                            <div key={index}>
                                <div
                                    className={`relative ${filterOrder.length === 0 || !filterOrder.includes(order.status) && 'hidden'}`}>
                                    <div className="card mx-auto w-full bg-base-100 shadow-xl mb-6">
                                        <figure><img src={plateImg} alt="plate"/></figure>
                                        <div className="information-wrapper">
                                            <button onClick={() => setModalManagement({
                                                data: {orderPlates: order.orderPlates},
                                                isOpen: !modalManagement.isOpen
                                            })}>
                                                <GrCircleInformation/>
                                            </button>
                                        </div>
                                        <div className="card-body relative">
                                            <h2 className="card-title font-bold">#order-{order.id}</h2>
                                            <div>
                                                <p>Commandé le
                                                    : {dayjs.tz(order.created_at).format('DD/MM/YYYY')} à {dayjs.tz(order.created_at).format('HH:mm')}</p>
                                                <p>Chez <span className="font-bold">{order.restaurant.name}</span></p>
                                            </div>
                                            {order.status !== 'to-do' && (
                                                <button
                                                    className="btn text-white bg-orange-500 border-orange-500 gap-x-2 mt-4"
                                                    onClick={() => generatePdf(order.id)}><span
                                                    className="text-white"><AiOutlineDownload
                                                    size={20}/></span> Télécharger</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute -top-2 -right-2">
                                        <span
                                            className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${order.status === 'to-do' ? 'orange' : 'green'}-500 opacity-75`}/>
                                        <span
                                            className={`relative inline-flex rounded-full h-5 w-5 bg-${order.status === 'to-do' ? 'orange' : 'green'}-500`}/>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : <p>Vous n'avez pas encore commandé 😥</p>
                }
                <Information displayModal={modalManagement} setDisplayModal={setModalManagement}>
                    <h3 className="font-bold pt-6 pb-4 text-left pl-3">Détails de votre commande</h3>
                    <div className="modal-content px-5">
                        {modalManagement.data?.orderPlates.map((plate) => (
                            <div className="flex items-center hover:text-orange-600 ease-in duration-300 gap-x-2"
                                 key={plate.id}>
                                <img
                                    src={plate.plate.type === PlateType.STARTER ? starter : (plate.plate.type === PlateType.DISH ? dish : dessert)}
                                    alt="starter" className="w-8 h-8 inline-block"/>
                                <p>{plate.plate.name} <span className="font-bold">x{plate.quantity}</span> - <span className="font-bold">{plate.price * plate.quantity} €</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </Information>
            </div>
        );
    } else {
        return (
            <div className="px-5">
                <HeaderAccount url={'/profile'} title={'Mes dernières commandes'}/>
                {
                    <LoadingPage color={"orange"}/>
                }
            </div>
        );
    }
}
