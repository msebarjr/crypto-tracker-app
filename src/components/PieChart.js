import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import styles from "../styles/PieChart.module.css";

function PieChart({ labels, chartData, title }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        // responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const coinData = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: chartData,
                backgroundColor: "orange",
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className={styles.pie_chart_container}>
            {chartData.length > 0 ? (
                <div className={styles.pie_chart}>
                    <Bar option={options} data={coinData} />
                </div>
            ) : (
                <div className={styles.no_chart}>
                    <p>Purchase Coins to See Data!</p>
                </div>
            )}
        </div>
    );
}

export default PieChart;
