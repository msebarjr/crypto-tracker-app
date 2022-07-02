import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";

import styles from "../../styles/Top100Table.module.css";

function Top100Row({ coin }) {
    const [saveCoin, setSaveCoin] = useState(false);

    function saveCoinHandler() {
        setSaveCoin((prevState) => !prevState);
    }

    const priceColor = coin.price_change_percentage_24h > 0 ? "green" : "red";

    return (
        <tr>
            <td className={styles.center} onClick={saveCoinHandler}>
                {saveCoin ? (
                    <AiFillStar className={`${styles.fav} ${styles.icon}`} />
                ) : (
                    <AiOutlineStar className={styles.icon} />
                )}
            </td>
            <td>{coin.market_cap_rank}</td>
            <td className={styles.link}>
                <div className={styles.coin_image}>
                    <img src={coin.image} alt={coin.id} />
                    {coin.name}
                </div>
            </td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td>
                <p style={{ color: priceColor }}>
                    {coin.price_change_percentage_24h}
                </p>
            </td>
            <td className={styles.fixed_cell}>
                ${coin.total_volume.toLocaleString()}
            </td>
            <td className={styles.fixed_cell}>
                ${coin.market_cap.toLocaleString()}
            </td>
            <td>
                <Sparklines data={coin.sparkline_in_7d.price}>
                    <SparklinesLine color="#17c763d8" />
                </Sparklines>
            </td>
        </tr>
    );
}

export default Top100Row;
