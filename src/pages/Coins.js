import { useState, useEffect } from "react";
import axios from "axios";

import CoinSearch from "../components/Coins/CoinSearch";
import Pagination from "../components/Pagination";
import Top100Coins from "../components/Coins/Top100Coins";

// import styles from "../styles/Coins.module.css";

const COINS_PER_PAGE = 5;
const URL = process.env.REACT_APP_COIN_API_KEY;

function Coins() {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get(URL).then((response) => {
            setCoins(response.data);
            setFilteredCoins(response.data);
        });
    }, [setFilteredCoins]);

    // Get the current coin
    const indexOfLastCoin = currentPage * COINS_PER_PAGE;
    const indexOfFirstCoin = indexOfLastCoin - COINS_PER_PAGE;
    const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    function paginationHandler(page) {
        setCurrentPage(page);
    }

    function filterCoinHandler(filteredData) {
        setFilteredCoins(filteredData);
    }

    return (
        <div>
            <CoinSearch coins={coins} filterCoin={filterCoinHandler} />            
            <Top100Coins coins={currentCoins} />
            <Pagination
                coinsPerPage={COINS_PER_PAGE}
                totalCoins={filteredCoins.length}
                paginate={paginationHandler}
            />
        </div>
    );
}

export default Coins;
