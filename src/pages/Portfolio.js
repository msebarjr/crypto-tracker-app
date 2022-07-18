import { useState } from "react";

import CoinsOwned from "../components/Coins/CoinsOwned";
import CoinsWatching from "../components/Coins/CoinsWatching";
import BuyCoinModal from "../components/Modals/BuyCoinModal";

import { useUser } from "../contexts/UserContext";

import styles from "../styles/Portfolio.module.css";

function Portfolio({ coins }) {
    const [isBuyingOpen, setIsBuyingOpen] = useState(false);
    const [coinToBuy, setCoinToBuy] = useState({});
    // const [isSellingOpen, setIsSellingOpen] = useState(false);

    const { user } = useUser();

    function openBuyModal(coinBuying) {
        setIsBuyingOpen(true);
        setCoinToBuy(coinBuying);
    }

    function closeBuyModal() {
        setIsBuyingOpen(false);
    }

    return (
        <div className={styles.portfolio_container}>
            <div className={styles.welcome}>
                <h4>
                    Welcome, <span>{user.name}</span>
                </h4>
                <div className={styles.balance_wrapper}>
                    <p>Your Balance:</p>
                    <p className={styles.balance}>
                        ${user.balance.toLocaleString()}
                    </p>
                </div>
            </div>
            <main className={styles.main}>
                <CoinsWatching coins={coins} openBuyModal={openBuyModal} />
                <CoinsOwned coins={coins} />
            </main>
            {isBuyingOpen && (
                <BuyCoinModal
                    coins={coins}
                    closeBuyModal={closeBuyModal}
                    coinBuying={coinToBuy}
                />
            )}
        </div>
    );
}

export default Portfolio;
