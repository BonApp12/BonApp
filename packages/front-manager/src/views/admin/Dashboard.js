import React, {useEffect, useState} from "react";
// Components
import CardChart from "components/Cards/CardChart.js";
import chartConfigEnum from "../../components/Enum/ChartConfigEnum";
import dayjs from "dayjs";
import {useRecoilState} from "recoil";
import {userAtom} from "../../states/user";
import countOrderCountByDate from "../../requests/countOrderCountByDate";
import countBestPlateRequest from "../../requests/countBestPlate";
import countPlateByRestaurant from "../../requests/countPlateByRestaurant";
import resetUserConnected from "../../helpers/resetUserConnected";
import {useHistory} from "react-router-dom";
import {getMonthsBeforeCurrentMonth} from "../../helpers/getMonthBeforeCurrentMonth";

export default function Dashboard() {
    const [monthState, setMonthState] = useState([]);
    const [countBestPlate, setCountBestPlate] = useState([]);
    const [countPlateType, setCountPlateType] = useState([]);
    const [userState, setUserState] = useRecoilState(userAtom);
    const history = useHistory();

    useEffect(() => {
        countOrderCountByDate(userState?.restaurant.id, dayjs().format("YYYY"))
            .then(async(res) => {
                if (res.status === 401) resetUserConnected(setUserState, history);
                const orderCount = await res.json();
                const months = getMonthsBeforeCurrentMonth();
                Object.keys(months).forEach((month) => {
                    orderCount.forEach(order => {
                        dayjs.locale("fr");
                        const monthOrder = dayjs().month(order.month - 1).format('MMMM');
                        if(monthOrder === month) {
                            months[month] = parseInt(order.count);
                        }
                    });
                });
                setMonthState(months);
            });

        countBestPlateRequest(userState?.restaurant.id, 'many')
            .then(async(res) => {
                if (res.status === 401) resetUserConnected(setUserState, history);
                setCountBestPlate(await res.json());
            })

        countPlateByRestaurant(userState?.restaurant.id)
            .then(async (res) => {
                if (res.status === 401) resetUserConnected(setUserState, history);
                setCountPlateType(await res.json())
            });
    },[]);

    const dataBarOrderCount = {
        labels: Object.keys(monthState).map(month => month),
        datasets: [
            {
                label: new Date().getFullYear(),
                backgroundColor: "#fb923c",
                borderColor: "#fb923c",
                data: Object.keys(monthState).map(index=> monthState[index]),
                fill: false,
                barThickness: 8,
            }
        ],
    }

    const dataDoughnutBestPlate = {
        labels: countBestPlate.map(plate => plate?.plateName),
        datasets: [{
            label: 'Plat par catégorie',
            data: countBestPlate.map(plate => plate.count),
            backgroundColor: "#fb923c",
            borderColor: "#fb923c",
            hoverOffset: 4
        }]
    }

    const dataBarPlateCount = {
        labels: countPlateType.map(plate => plate?.type),
        datasets: [{
            label: 'Plat par catégorie',
            data: countPlateType.map(plate => plate.count),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
                    <CardChart
                        identifier="nb_orders"
                        backgroundColor="bg-blueGray-700"
                        titleColor="text-blueGray-200"
                        subTitleColor="text-blueGray-200"
                        title="Nombre de commandes"
                        subTitle="Nombre de commandes enregistrées"
                        config={chartConfigEnum(dataBarOrderCount, 'line')}
                    />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardChart
                        identifier="nb_views"
                        backgroundColor="bg-white"
                        titleColor="text-blueGray"
                        subTitleColor="text-blueGray"
                        title="Nombre de plat commandés"
                        subTitle="Nombre de plat les plus commandés"
                        config={chartConfigEnum(dataDoughnutBestPlate, 'bar')}
                    />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardChart
                        identifier="nb_plate"
                        backgroundColor="bg-white"
                        titleColor="text-blueGray"
                        subTitleColor="text-blueGray"
                        title="Nombre de plat"
                        subTitle="Nombre de plat par catégorie"
                        config={chartConfigEnum(dataBarPlateCount, 'doughnut')}
                    />
                </div>
            </div>
        </>
    );
}
