import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";

import CoinPurchasedDropdown from "../Coins/CoinPurchasedDropdown";

import styles from "../../styles/CoinOwnedRow.module.css";

function CoinOwnedRow({ coin, currentCoin }) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const pricePositive = coin.price_change_percentage_24h > 0;
    const pricingColor = pricePositive ? "rgb(44, 165, 44)" : "red";

    function openDropdownHandler() {
        setOpenDropdown(true);
        console.log("Coin: ", coin);
        console.log("Current Coin: ", currentCoin);
    }

    function closeDropdownHandler() {
        setOpenDropdown(false);
        console.log(coin);
    }

    return (
        <>
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
                <td>
                    {" "}
                    <Link
                        to={`/coin/${coin.id}`}
                        state={coin.id}
                        className={styles.td}
                    >
                        {currentCoin.total_units_purchased}
                    </Link>
                </td>
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
                <td className={styles.expand}>
                    {openDropdown ? (
                        <AiFillCaretUp onClick={closeDropdownHandler} />
                    ) : (
                        <AiFillCaretDown onClick={openDropdownHandler} />
                    )}
                </td>
            </tr>
            {openDropdown ? (
                <CoinPurchasedDropdown
                    currentCoin={currentCoin}
                    coinData={coin}
                />
            ) : null}
        </>
    );
}

export default CoinOwnedRow;
