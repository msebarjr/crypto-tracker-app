import {
    AiOutlineStar,
    AiFillStar,
    AiFillCaretDown,
    AiFillCaretUp,
} from "react-icons/ai";

import styles from "../../styles/CoinWatchingRow.module.css";

function CoinWatchingRow({ coinWatching }) {
    const pricePositive = coinWatching.price_change_percentage_24h > 0;
    const pricingColor = pricePositive ? "rgb(17, 233, 17)" : "red";
    console.log("ROw: ", coinWatching);

    return (
        <div className={styles.watching_row}>
            <div className={styles.image_wrapper}>
                <img src={coinWatching.image} alt={coinWatching.id} />
                <p className={styles.coin_name}>{coinWatching.name}</p>
            </div>
            <div className={styles.pricing_wrapper}>
                <div className={styles.price}>
                    <p>${coinWatching.current_price.toLocaleString()}</p>
                </div>
                <div
                    className={styles.price_change}
                    style={{ color: pricingColor }}
                >
                    {pricePositive ? (
                        <AiFillCaretUp className={styles.icon} />
                    ) : (
                        <AiFillCaretDown className={styles.icon} />
                    )}
                    <p className={styles.change_percentage}>
                        {coinWatching.price_change_percentage_24h.toFixed(1)}%
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CoinWatchingRow;
