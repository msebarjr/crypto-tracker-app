import CoinMarketInfo from "./CoinMarketInfo";
import CoinStats from "./CoinStats";

import styles from "../../styles/CoinData.module.css";
import { useEffect } from "react";

function CoinData({ coin, coins }) {
    useEffect(() => {
        console.log(coins);
    });
    return (
        <div className={styles.data_container}>
            <CoinStats coin={coin} coins={coins} />
            <CoinMarketInfo coin={coin} />
        </div>
    );
}

export default CoinData;
