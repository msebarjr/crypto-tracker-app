import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import CoinData from "../components/Coins/CoinData";
import CoinInfo from "../components/Coins/CoinInfo";
import CoinPriceChange from "../components/Coins/CoinPriceChange";

import styles from "../styles/CoinPage.module.css";

function CoinPage() {
    const [coin, setCoin] = useState({});

    const location = useLocation();
    const coinId = location.state;

    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`;

    useEffect(() => {
        axios.get(url).then((response) => {
            setCoin(response.data);
        });
    }, [url]);

    return (
        <div className={styles.coin_page_container}>
            <CoinData coin={coin} />
            <CoinPriceChange coin={coin} />
            <CoinInfo coin={coin} />
        </div>
    );
}

export default CoinPage;
