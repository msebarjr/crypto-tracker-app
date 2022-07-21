import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";

import Button from "../UI/Button";

import { useUser } from "../../contexts/UserContext";

import styles from "../../styles/CoinOwnedRow.module.css";

function CoinOwnedRow({ coin, currentCoin }) {
    // const [units, setUnits] = useState(0);
    const pricePositive = coin.price_change_percentage_24h > 0;
    const pricingColor = pricePositive ? "rgb(44, 165, 44)" : "red";

    function sellCoinHandler() {
        console.log(coin);
    }

    return (
        <tr>
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
                    style={{ color: pricingColor }}
                >
                    <div className={styles.pricing_24h}>
                        {pricePositive ? (
                            <AiFillCaretUp className={styles.icon} />
                        ) : (
                            <AiFillCaretDown className={styles.icon} />
                        )}
                        <p className={styles.change_percentage}>
                            {coin.price_change_percentage_24h.toFixed(1)}%
                        </p>
                    </div>
                </Link>
            </td>
            <td>{currentCoin.total_units_purchased}</td>
            <td>
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
            <td className={styles.center}>
                <Button style={styles.sell_button} onClick={sellCoinHandler}>
                    Sell
                </Button>
            </td>
        </tr>
    );
}

export default CoinOwnedRow;
