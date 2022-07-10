import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { toast } from "react-toastify";

import styles from "../../styles/Top100Table.module.css";

function Top100Row({ coin }) {
    const [favoriteCoin, setFavoriteCoin] = useState(false);

    function addCoinToFavorites(coinName) {
        setFavoriteCoin(true);
        toast.info(`${coinName} added to Favorites`);
    }

    function removeCoinFromFavorites(coinName) {
        setFavoriteCoin(false);
        toast.error(`${coinName} removed as Favorite`);
    }

    const priceColor = coin.price_change_percentage_24h > 0 ? "green" : "red";

    return (
        <tr>
            <td className={styles.center}>
                {favoriteCoin ? (
                    <AiFillStar
                        className={`${styles.fav} ${styles.icon}`}
                        onClick={removeCoinFromFavorites.bind(this, coin.name)}
                    />
                ) : (
                    <AiOutlineStar
                        className={styles.icon}
                        onClick={addCoinToFavorites.bind(this, coin.name)}
                    />
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
