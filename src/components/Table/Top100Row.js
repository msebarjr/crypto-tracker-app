import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

import styles from "../../styles/Top100Table.module.css";

function Top100Row({ coin }) {
    const [isWatching, setIsWacthing] = useState(false);
    const [favoriteCoins, setFavoriteCoins] = useState([]);

    const { currentUser } = useAuth();
    const { updateDocument, updateUser } = useUser();

    const priceColor = coin.price_change_percentage_24h > 0 ? "green" : "red";

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
        <tr>
            <td className={styles.center}>
                {isWatching ? (
                    <AiFillStar
                        className={styles.fav}
                        onClick={removeCoinFromFavorites}
                    />
                ) : (
                    <AiOutlineStar onClick={addCoinToFavorites} />
                )}
            </td>
            <td>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    {coin.market_cap_rank}
                </Link>
            </td>
            <td>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    <div className={styles.coin_image}>
                        <img
                            src={coin.image}
                            alt={coin.id}
                            className={styles.hide_mobile}
                        />
                        <p>{coin.name}</p>
                    </div>
                </Link>
            </td>
            <td className={styles.hide_mobile}>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    {coin.symbol.toUpperCase()}
                </Link>
            </td>
            <td>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    ${coin.current_price.toLocaleString()}
                </Link>
            </td>
            <td>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    <p style={{ color: priceColor }}>
                        {coin.price_change_percentage_24h}
                    </p>
                </Link>
            </td>
            <td className={`${styles.fixed_cell} ${styles.hide_tablet}`}>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    ${coin.total_volume.toLocaleString()}
                </Link>
            </td>
            <td className={`${styles.fixed_cell} ${styles.hide_tablet}`}>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    ${coin.market_cap.toLocaleString()}
                </Link>
            </td>
            <td className={styles.hide_mobile}>
                <Link
                    to={`/coin/${coin.id}`}
                    state={coin.id}
                    className={styles.td}
                >
                    <Sparklines data={coin.sparkline_in_7d.price}>
                        <SparklinesLine color="#17c763d8" />
                    </Sparklines>
                </Link>
            </td>
        </tr>
    );
}

export default Top100Row;
