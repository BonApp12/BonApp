import React from 'react'

function Stats() {

    const stats = [{
        class: 'card border-3 border-end-0 border-primary mb-3', title: 'Nombre de plats', value: Math.random()
    }, {
        class: 'card border-3 border-start-0 border-end-0 border-info mb-3',
        title: 'Plat le plus commandé',
        value: 'Grec'
    }, {
        class: 'card border-3 border-start-0 border-warning mb-3', title: 'Commandes', value: Math.random()
    }];

    return (
        <div>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="row">
                {stats.map((stat) => {
                    return (
                        <div className="col-sm-4 text-center">
                            <div className={stat.class}>
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