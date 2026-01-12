import style from './Insights.module.css';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

export default function Insights() {
    const [insight, setInsight] = useState(null);
    const [amountInsight, setAmountInsight] = useState(null);
    const [typeInsight, setTypeInsight] = useState(null);
    const [chartKey, setChartKey] = useState(0);

    useEffect(() => {
        const onResize = () => setChartKey((prev) => prev + 1);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        async function fetchInsights() {
            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/graph/confidence-by-outcome`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await res.json();
                setInsight(data);
            } catch (error) {
                console.error('Error fetching insights:', error);
            }
        }
        fetchInsights();
    }, []);

    useEffect(() => {
        async function fetchAmountInsights() {
            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/graph/amount-by-outcome`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await res.json();
                setAmountInsight(data);
            } catch (error) {
                console.error('Error fetching amount insights:', error);
            }
        }
        fetchAmountInsights();
    }, []);
    useEffect(() => {
        async function fetchTypeInsights() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/graph/type-by-outcome`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await res.json();
                setTypeInsight(data);
            } catch (error) {
                console.error('Error fetching type insights:', error);
            }
        }
        fetchTypeInsights();
    }, []);

    if (!insight) return null;

    const data = {
        labels: insight.labels,
        datasets: insight.datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Confidence by Outcome',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    if (!amountInsight) return null;
    const amountData = {
        labels: amountInsight.labels,
        datasets: amountInsight.datasets,
    };
    const amountOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Amount by Outcome',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };
    if (!typeInsight) return null;

    const typeData = {
        labels: typeInsight.labels,
        datasets: typeInsight.datasets,
    };
    const typeOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Type by Outcome',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <>
            <h1 className={style.title}>Insights</h1>
            <div className={style.charts}>
                <div className={style.confidenceContainer}>
                    <Bar
                        key={chartKey}
                        data={data}
                        options={options}
                        className={style.chart}
                    />
                </div>
                <div className={style.amountContainer}>
                    <Bar
                        key={chartKey}
                        data={amountData}
                        options={amountOptions}
                        className={style.chart}
                    />
                </div>
                <div className={style.typeContainer}>
                    <Bar
                        key={chartKey}
                        data={typeData}
                        options={typeOptions}
                        className={style.chart}
                    />
                </div>
            </div>
        </>
    );
}
