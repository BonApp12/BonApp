import React from 'react';
import { Bar } from 'react-chartjs-2'

function Stats() {

    const BarChart = () => {
        return (
            <div>
                <p>test</p>
            </div>
        )
    }

    const stats = [
        {
            class: 'card border-3 border-end-0 border-primary mb-3',
            title: 'Nombre de plats',
            value: Math.random()
        },
        {
            class: 'card border-3 border-start-0 border-end-0 border-info mb-3',
            title: 'Plat le plus commandé',
            value: 'Grec'
        },
        {
            class: 'card border-3 border-start-0 border-end-0 border-warning mb-3',
            title: 'Commandes',
            value: Math.random()
        },
        {
            class: 'card border-3 border-start-0 border-dark mb-3',
            title: 'Utilisateurs',
            value: Math.random()
        }
    ];

    return (
        <div className='p-3'>
            <h3 className='p-3'>Statistiques principales</h3>
            <div className="row">
                {stats.map((stat) => {
                    return (
                        <div className="col-sm-3 text-center">
                            <div className={stat.class}>
                                <div className="card-body">
                                    <h5 className="card-title">{stat.title}</h5>
                                    <p className="card-text">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <h3 className='p-3'>Quelques graphiques</h3>
            <div className='row'>
                { BarChart() }
            </div>
        </div>
    )
}

export default Stats;