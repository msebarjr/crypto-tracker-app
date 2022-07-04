import { useState, useEffect } from "react";
import axios from "axios";

import CoinSearch from "../components/Coins/CoinSearch";
import Pagination from "../components/Pagination";
import Top100Coins from "../components/Coins/Top100Coins";
import TableResultsInfo from "../components/Table/TableResultsInfo";

function Coins() {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(5);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        axios.get(process.env.REACT_APP_COIN_API_KEY).then((response) => {
            setCoins(response.data);
            setFilteredCoins(response.data);
        });
    }, [setFilteredCoins]);

    // Get the current coin
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    function paginationHandler(page) {
        setActivePage(page);
        setCurrentPage(page);
    }

    function filterCoinHandler(filteredData) {
        setFilteredCoins(filteredData);
    }

    function numberOfResultsHandler(number) {
        setCoinsPerPage(number);
        setCurrentPage(1);
    }

    function resetActivePageHandler() {
        setActivePage(1);
    }

    return (
        <div>
            <CoinSearch coins={coins} filterCoin={filterCoinHandler} />
            <TableResultsInfo
                numberOfResults={numberOfResultsHandler}
                // activePageNumber={activePageNumberHandler}
                coinsPerPage={coinsPerPage}
                totalCoins={filteredCoins.length}
                resetActivePage={resetActivePageHandler}
            />
            <Top100Coins coins={currentCoins} />
            <Pagination
                coinsPerPage={coinsPerPage}
                totalCoins={filteredCoins.length}
                paginate={paginationHandler}
                activePageNumber={activePage}
            />
        </div>
    );
}

export default Coins;
