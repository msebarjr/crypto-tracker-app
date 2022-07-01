import { useState } from "react";

import Input from "./UI/Input";

import styles from "../styles/CoinSearch.module.css";

function CoinSearch() {
    const [searchInput, enteredSearchInput] = useState("");

    function searchInputHandler(e) {
        enteredSearchInput(e.target.value);
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
