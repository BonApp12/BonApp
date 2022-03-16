import React, {useEffect, useState} from 'react'
import fetchFullPlate from "../requests/fetchFullPlate";
import fetchFullOrder from "../requests/fetchFullOrder";

function Stats() {

    const [totalPlate, setPlate] = useState(0)

    useEffect(()=>{
        fetchFullPlate()
            .then(res => res.json())
            .then(data => {
                setPlate(data.length)
            })
    })

    const [totalOrder, setOrder] = useState(0)

    useEffect(()=> {
        fetchFullOrder()
            .then(res => res.json())
            .then(data => {
                console.log(data.length)
                setOrder(data.length)
            })
    })

    const stats = [{
        class: 'card border-3 border-end-0 border-primary mb-3', title: 'Nombre de plats', value: totalPlate
    }, {
        class: 'card border-3 border-start-0 border-end-0 border-info mb-3',
        title: 'Plat le plus commandé',
        value: 'Grec'
    }, {
        class: 'card border-3 border-start-0 border-warning mb-3', title: 'Commandes', value: totalOrder
    }];

    return (
        <div>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="row">
                {stats.map((stat, key) => {
                    return (
                        <div className="col-sm-4 text-center">
                            <div className={stat.class} id={key}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {stat.title}
                                    </h5>
                                    <p className="card-text">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Stats;