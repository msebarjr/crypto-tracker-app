import CoinsOwned from "../components/Coins/CoinsOwned";
import CoinsWatching from "../components/Coins/CoinsWatching";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/Portfolio.module.css";

function Portfolio({ coins }) {
    const { user } = useUser();

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
                <CoinsWatching coins={coins} />
                <CoinsOwned coins={coins} />
            </main>
        </div>
    );
}

export default Portfolio;
