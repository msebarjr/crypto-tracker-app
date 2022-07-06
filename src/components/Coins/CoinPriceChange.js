import styles from "../../styles/CoinPriceChange.module.css";

function CoinPriceChange({ coin }) {
    return (
        <div className={styles.price_change_container}>
            <div className={styles.market_wrapper}>
                <div className={styles.market_row}>
                    <p>Price Change (24h)</p>
                    {coin.market_data ? (
                        <span>
                            {coin.market_data.price_change_percentage_24h.toFixed(
                                2
                            )}
                            %
                        </span>
                    ) : null}
                </div>
                <div className={styles.market_row}>
                    <p>Price Change (7d)</p>
                    {coin.market_data ? (
                        <span>
                            {coin.market_data.price_change_percentage_7d.toFixed(
                                2
                            )}
                            %
                        </span>
                    ) : null}
                </div>
                <div className={styles.market_row}>
                    <p>Price Change (14d)</p>
                    {coin.market_data ? (
                        <span>
                            {coin.market_data.price_change_percentage_14d.toFixed(
                                2
                            )}
                            %
                        </span>
                    ) : null}
                </div>
                <div className={styles.market_row}>
                    <p>Price Change (30d)</p>
                    {coin.market_data ? (
                        <span>
                            {coin.market_data.price_change_percentage_30d.toFixed(
                                2
                            )}
                            %
                        </span>
                    ) : null}
                </div>
                <div className={styles.market_row}>
                    <p>Price Change (60d)</p>
                    {coin.market_data ? (
                        <span>
                            {coin.market_data.price_change_percentage_60d.toFixed(
                                2
                            )}
                            %
                        </span>
                    ) : null}
                </div>
                <div className={styles.market_row}>
                    <p>Price Change (1y)</p>
                    {coin.market_data ? (
                        <span>
                            {coin.market_data.price_change_percentage_1y.toFixed(
                                2
                            )}
                            %
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default CoinPriceChange;
