import CoinMarketInfo from "./CoinMarketInfo";
import CoinStats from "./CoinStats";

import styles from "../../styles/CoinData.module.css";

function CoinData({ coin }) {
    return (
        <div className={styles.data_container}>
            <CoinStats coin={coin} />
            <CoinMarketInfo coin={coin} />
        </div>
    );
}

export default CoinData;
