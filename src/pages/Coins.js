import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

import CoinSearch from "../components/Coins/CoinSearch";
import Pagination from "../components/Pagination";
import Top100Coins from "../components/Coins/Top100Coins";
import TableResultsInfo from "../components/Table/TableResultsInfo";
import LoadingSpinner from "../components/LoadingSpinner";

function Coins() {
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage, setCoinsPerPage] = useState(5);
    const [activePage, setActivePage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [coins, setCoins] = useState({});

    const effectRan = useRef(false);
    const { currentUser } = useAuth();
    const { getUser } = useUser();

    useEffect(() => {
        if (effectRan.current === false) {
            axios.get(process.env.REACT_APP_COIN_API_KEY).then((response) => {
                setIsLoading(true);
                setCoins(response.data);
                setFilteredCoins(response.data);
            });
        }

        return () => {
            effectRan.current = true;
        };
    }, [getUser, currentUser.uid, coins]);

    useEffect(() => {
        async function getUserInfo() {
            await getUser(currentUser.uid);
            setIsLoading(false);
        }

        getUserInfo();
    }, [getUser, currentUser.uid]);

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
            {isLoading ? (
                <LoadingSpinner />
            ) : (
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
            )}
        </div>
    );
}

export default Coins;
