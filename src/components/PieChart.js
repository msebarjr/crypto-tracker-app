import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import styles from "../styles/PieChart.module.css";

function PieChart({ labels, chartData, colors }) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const coinData = {
        labels: labels,
        datasets: [
            {
                label: "Total Units Per Coin",
                data: chartData,
                backgroundColor: colors,
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className={styles.pie_chart_container}>
            {chartData.length > 0 ? (
                <div className={styles.pie_chart}>
                    <Pie data={coinData} />
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
