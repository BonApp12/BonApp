import React, {useEffect, useState} from "react";
import fetchFullPlate from "requests/fetchFullPlate";
import fetchFullOrder from "requests/fetchFullOrder";
import CardStats from "components/Cards/CardStats.js";
import fetchTeamMembers from "../../requests/fetchTeamMember";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import resetUserConnected from "../../helpers/resetUserConnected";
import {useHistory} from "react-router-dom";
import countBestPlateRequest from "../../requests/countBestPlate";

export default function HeaderStats() {
    const [plates, setPlate] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userState, setUserState] = useRecoilState(userAtom);
    const [bestPlateState, setBestPlateState] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (userState.length !== 0) {
            fetchFullPlate(userState?.restaurant.id).then(async resPlate => {
                if (resPlate.status === 401) resetUserConnected(setUserState, history);
                setPlate(await resPlate.json());
            });
            fetchFullOrder(userState?.restaurant.id, 'only-orders').then(async resOrder => {
                if (resOrder.status === 401) resetUserConnected(setUserState, history);
                setOrders(await resOrder.json());
            });
            fetchTeamMembers(userState?.restaurant.id).then(async resTeamMember => {
                if (resTeamMember.status === 401) resetUserConnected(setUserState, history);
                setTeamMembers(await resTeamMember.json());
            });
            countBestPlateRequest(userState?.restaurant.id, 'only-one').then(res => {
                if (res.status === 401) return resetUserConnected(setUserState, history);
                return res.json();
            }).then(resBestPlate => {
                setBestPlateState(resBestPlate);
            });
        } else {
            resetUserConnected(setUserState, history);
        }
        //Créer une fonction de nettoyage (cleanup) pour eviter les memory leaks
        return function cleanup() {
            setPlate([]);
            setOrders([]);
            setTeamMembers([]);
        };
    }, []);

    return (
        <>
            {/* Header */}
            <div className="relative bg-orange-400 md:pt-32 pb-32 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statTitle="Nombre de commandes"
                                    statValue={`${orders.length}`}
                                    statIconName="far fa-chart-bar"
                                    statIconColor="bg-red-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statTitle="Nombre de plats"
                                    statValue={`${plates.length}`}
                                    statIconName="fas fa-hamburger"
                                    statIconColor="bg-pink-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statTitle="Plat le plus commandé"
                                    statValue={`${bestPlateState?.plateName ? `${bestPlateState?.plateName} (${bestPlateState?.count} fois)` : 'Aucun plat'}`}
                                    statIconName="fas fa-grin-hearts"
                                    statIconColor="bg-lightBlue-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statTitle="Membres de l'équipe"
                                    statValue={`${teamMembers.length}`}
                                    statIconName="fas fa-users"
                                    statIconColor="bg-red-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
