import React, {useEffect, useState} from "react";
import orderByUser from "../../requests/orders/orderByUser";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../states/user";
import plateImg from '../../img/plate.jpg';
import starter from '../../img/foodCategory/starter.png';
import dish from '../../img/foodCategory/dish.png';
import dessert from '../../img/foodCategory/dessert.png';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import HeaderAccount from "../HeaderAccount/HeaderAccount";
import LoadingPage from "../Loading/LoadingPage";
import {AiOutlineCheck} from "react-icons/ai";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function OrdersAccount(){
    const [orders,setOrders] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const userState = useRecoilValue(userAtom);

    useEffect(() => {
        setLoading(true);
        orderByUser(userState.id)
            .then(res => res.json())
            .then(ordersData => {
                setLoading(false);
                setOrders(ordersData)
            });
    },[]);

    const activeBtn = (event,type) => {
        const isCheck = event.currentTarget.classList.contains('bg-white');

        if(isCheck){
            event.currentTarget.classList.replace('bg-white','bg-orange-500');
            event.currentTarget.classList.replace('text-orange-500','text-white');
            event.currentTarget.querySelector('span').classList.remove('hidden');
            filter.push(type);
        }else{
            event.currentTarget.classList.replace('bg-orange-500','bg-white');
            event.currentTarget.classList.replace('text-white','text-orange-500');
            event.currentTarget.querySelector('span').classList.add('hidden');
            filter.splice(filter.indexOf(type),1);
        }
        setFilter([...filter]);
    }

    if (!loading) {
        return (
            <div className="px-5">
                <HeaderAccount url={'/profile'} title={'Mes dernières commandes'}/>
                <div className="flex flex-row justify-center space-x-2 mb-5">
                    <button className="btn text-orange-500 bg-white border-orange-500 gap-x-2" onClick={(e) => activeBtn(e,'to-do')}>En cours <span className="hidden text-white"><AiOutlineCheck size={20} /></span></button>
                    <button className="btn text-orange-500 bg-white border-orange-500 gap-x-2" onClick={(e) => activeBtn(e,'completed')}>Passée <span className="hidden text-white"><AiOutlineCheck size={20} /></span></button>
                </div>
                {
                    orders.length >= 1 ? orders.map((order, index) =>
                        (
                            <div key={index}>
                                <div className={`relative ${filter.length === 0 || !filter.includes(order.status) && 'hidden'}`}>
                                    <div className="card mx-auto w-full bg-base-100 shadow-xl mb-6">
                                        <figure><img src={plateImg} alt="plate"/></figure>
                                        <div className="card-body relative">
                                            <div className={`absolute top-6 left-3`}>
                                                <img src={order.plate.type === "ENTREE" ? starter : (order.plate.type === 'PLAT' ? dish : dessert)} alt="starter" className="w-10 h-10" />
                                            </div>
                                            <h2 className="card-title font-bold">#order-{order.id}</h2>
                                            <h3 className="mb-5">{order.plate.name}</h3>
                                            <div>
                                                <p>Commandé le
                                                    : {dayjs.tz(order.created_at).format('DD/MM/YYYY')} à {dayjs.tz(order.created_at).format('HH:mm')}</p>
                                                <p>Chez <span className="font-bold">{order.restaurant.name}</span></p>
                                            </div>
                                            <p className="font-bold text-2xl mt-3">{order.plate.price.toFixed(2)} €</p>
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