import {
    AiOutlineStar,
    AiFillStar,
    AiFillCaretDown,
    AiFillCaretUp,
} from "react-icons/ai";

import Button from "../UI/Button";
import CoinSparkline from "./CoinSparkline";

import styles from "../../styles/CoinStats.module.css";

function CoinStats({ coin }) {
    const price_change_style =
        coin.market_data?.price_change_percentage > 0 ? "green" : "red";

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
                    <div className={styles.price_change}>
                        {coin.market_data?.price_change_percentage_24h > 0 ? (
                            <AiFillCaretUp
                                color="green"
                                className={styles.icon}
                            />
                        ) : (
                            <AiFillCaretDown
                                color="red"
                                className={styles.icon}
                            />
                        )}
                        <p
                            style={{ color: price_change_style }}
                            className={styles.change_percentage}
                        >
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
                <AiOutlineStar size={24} />
            </div>
            <CoinSparkline data={coin.market_data?.sparkline_7d.price} />
        </div>
    );
}

export default CoinStats;
