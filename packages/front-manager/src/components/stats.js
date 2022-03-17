import React, {useEffect, useState} from 'react'
import fetchFullPlate from "../requests/fetchFullPlate";
import fetchFullOrder from "../requests/fetchFullOrder";
import updateOrder from "../requests/updateOrder";

function Stats() {

    const [totalPlate, setPlate] = useState(0)

    useEffect(() => {
        fetchFullPlate()
            .then(res => res.json())
            .then(data => {
                setPlate(data.length)
            })
    }, [])

    const [orders, setOrders] = useState([])

    useEffect(() => {
        /* Ici on part du principe que le restaurant qui est connecté à l'ID = 1 */
        fetchFullOrder(1)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [])

    const [totalOrder, setTotalOrder] = useState(0)

    useEffect(() => {
        fetchFullOrder(1)
            .then(res => res.json())
            .then(data => {
                setTotalOrder(data.length);
            })
    }, [])

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
                <h1 className="h2">Commande en cours ({totalOrder})</h1>
            </div>

            <table className="table">
                <thead className="table-dark">
                <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                <tr>
                    <th scope="row">{order.id}</th>
                    <td>{order.user.lastname}</td>
                    <td>{order.user.firstname}</td>
                    <td>{order.created_at}</td>
                    <td>{order.status}</td>
                    <td>
                        <button className="btn btn-success" onClick={() => updateOrder(order.id)}>
                            Valider
                        </button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>

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