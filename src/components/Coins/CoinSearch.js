import { useState } from "react";

import Input from "../UI/Input";

import styles from "../../styles/CoinSearch.module.css";

function CoinSearch({ coins, filterCoin }) {
    const [searchInput, enteredSearchInput] = useState("");

    function searchInputHandler(e) {
        if (e.target.value) {
            const filteredData = coins.filter((coin) => {
                const coinData = coin.name
                    ? coin.name.toLowerCase()
                    : "".toLowerCase();
                const inputText = e.target.value.toLowerCase();
                return coinData.indexOf(inputText) > -1;
            });
            enteredSearchInput(e.target.value);
            filterCoin(filteredData);
        } else {
            filterCoin(coins);
            enteredSearchInput(e.target.value);
        }
    }

    return (
        <div className={styles.coin_search}>
            <h2>Search Coins</h2>
            <Input
                config={{ type: "search", placeholder: "Search Coin..." }}
                onChange={searchInputHandler}
                value={searchInput}
                style={styles.coin_search_input}
            />
        </div>
    );
}

export default CoinSearch;
