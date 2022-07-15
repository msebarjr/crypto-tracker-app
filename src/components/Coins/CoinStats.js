import { useState, useEffect } from "react";
import {
    AiOutlineStar,
    AiFillStar,
    AiFillCaretDown,
    AiFillCaretUp,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import Button from "../UI/Button";
import CoinSparkline from "./CoinSparkline";

import styles from "../../styles/CoinStats.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

function CoinStats({ coin }) {
    const [isWatching, setIsWacthing] = useState(false);
    const [favoriteCoins, setFavoriteCoins] = useState([]);

    const { currentUser } = useAuth();
    const { updateDocument, updateUser } = useUser();

    const priceColor =
        coin.market_data?.price_change_percentage_24h > 0
            ? "rgb(17, 233, 17)"
            : "red";

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setFavoriteCoins(doc.data().coinsWatching);
            updateUser(doc.data());
        });

        return () => {
            unsub();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.uid]);

    useEffect(() => {
        setIsWacthing(favoriteCoins.includes(coin.id));
    }, [favoriteCoins, coin.id]);

    function addCoinToFavorites() {
        const coins = [...favoriteCoins, coin.id];
        toast.info(`${coin.name} added to Favorites`);
        updateDocument(currentUser.uid, { coinsWatching: coins });
    }

    function removeCoinFromFavorites() {
        const coins = favoriteCoins.filter((favCoin) => favCoin !== coin.id);
        toast.error(`${coin.name} removed as Favorite`);
        updateDocument(currentUser.uid, { coinsWatching: coins });
    }

    return (
        <div className={styles.stats_container}>
            <div className={styles.rank}>
                <p>Rank # {coin?.market_cap_rank}</p>
            </div>
            <div className={styles.title_price_wrapper}>
                <div className={styles.title}>
                    <img src={coin.image?.small} alt={coin.id} />
                    <p className={styles.coin_title}>{coin?.name}</p>
                    <p>({coin.symbol?.toUpperCase()})</p>
                </div>
                <div className={styles.price}>
                    {coin.market_data?.current_price ? (
                        <p className={styles.price_current_price}>
                            $
                            {coin.market_data.current_price.usd.toLocaleString()}
                        </p>
                    ) : null}
                    <div
                        className={styles.price_change}
                        style={{ color: priceColor }}
                    >
                        {coin.market_data?.price_change_percentage_24h > 0 ? (
                            <AiFillCaretUp className={styles.icon} />
                        ) : (
                            <AiFillCaretDown className={styles.icon} />
                        )}
                        <p className={styles.change_percentage}>
                            {coin.market_data?.price_change_percentage_24h.toFixed(
                                1
                            )}
                            %
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <Button style={styles.buy_button}>Buy</Button>
                <Button style={styles.sell_button}>Sell</Button>

                {isWatching ? (
                    <div className={styles.watching}>
                        <AiFillStar
                            size={24}
                            className={[`${styles.fav} ${styles.star}`]}
                            onClick={removeCoinFromFavorites}
                        />
                        <p>Watching</p>
                    </div>
                ) : (
                    <AiOutlineStar
                        className={styles.star}
                        size={24}
                        onClick={addCoinToFavorites}
                    />
                )}
            </div>
            <CoinSparkline data={coin.market_data?.sparkline_7d.price} />
        </div>
    );
}

export default CoinStats;
