export const ChartConfigEnum = (data,type) => {
    return {
        type: type,
        data: data,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
                display: false,
                text: "Orders Chart",
            },
            tooltips: {
                mode: "index",
                intersect: false,
            },
            hover: {
                mode: "nearest",
                intersect: true,
            },
            legend: {
                labels: {
                    fontColor: "#5f5959",
                },
                align: "end",
                position: "bottom",
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: "Month",
                        },
                        gridLines: {
                            borderDash: [2],
                            borderDashOffset: [2],
                            color: "rgba(33, 37, 41, 0.3)",
                            zeroLineColor: "rgba(33, 37, 41, 0.3)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                        },
                    },
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: "Value",
                        },
                        gridLines: {
                            borderDash: [2],
                            drawBorder: false,
                            borderDashOffset: [2],
                            color: "rgba(33, 37, 41, 0.2)",
                            zeroLineColor: "rgba(33, 37, 41, 0.15)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    },
                ]
            },
        },
    }
};

export default ChartConfigEnum;