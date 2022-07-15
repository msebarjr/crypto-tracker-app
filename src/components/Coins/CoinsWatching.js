import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { db } from "../../firebase";

import CoinWatchingRow from "./CoinWatchingRow";

import styles from "../../styles/CoinsWatching.module.css";

function CoinsWatching({ coins }) {
    const [favoriteCoins, setFavoriteCoins] = useState([]);

    const { currentUser } = useAuth();
    const { updateUser } = useUser();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            console.log("Current data: ", doc.data().coinsWatching);
            setFavoriteCoins(doc.data().coinsWatching);
            updateUser(doc.data());
        });

        return () => {
            unsub();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.uid]);

    return (
        <div className={styles.coins_watching}>
            <h4>Coins Watching</h4>
            {favoriteCoins && favoriteCoins.length > 0 ? (
                favoriteCoins.map((favCoin) => {
                    const coinWatching = coins.find(
                        (coin) => coin.id === favCoin
                    );
                    return (
                        <CoinWatchingRow
                            key={favCoin}
                            coinWatching={coinWatching}
                        />
                    );
                })
            ) : (
                <p>Not currently watching any coins.</p>
            )}
        </div>
    );
}

export default CoinsWatching;
