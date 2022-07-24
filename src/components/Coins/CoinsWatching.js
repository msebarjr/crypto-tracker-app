import { toast } from "react-toastify";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

import CoinWatchingRow from "./CoinWatchingRow";

import styles from "../../styles/CoinsWatching.module.css";

function CoinsWatching({ coins, openBuyModal, favoriteCoins }) {
    const { currentUser } = useAuth();
    const { updateDocument } = useUser();

    function removeCoinFromFavorites(coin) {
        const coins = favoriteCoins.filter((favCoin) => favCoin !== coin.id);
        toast.error(`${coin.name} removed as Favorite`);
        updateDocument(currentUser.uid, { coinsWatching: coins });
    }

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
                            openBuyModal={openBuyModal}
                            onClick={removeCoinFromFavorites.bind(
                                this,
                                coinWatching
                            )}
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
