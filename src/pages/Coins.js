import CoinSearch from "../components/Coins/CoinSearch";
import Top100Coins from "../components/Coins/Top100Coins";

// import styles from "../styles/Coins.module.css";

function Coins({ coins }) {
    return (
        <div>
            <CoinSearch />
            <Top100Coins coins={coins} />
        </div>
    );
}

export default Coins;
