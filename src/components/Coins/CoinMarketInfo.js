import styles from "../../styles/CoinMarketInfo.module.css";

function CoinMarketInfo({ coin }) {
    const fully_diluted_val =
        coin.market_data?.current_price.usd * coin.market_data?.max_supply;

    return (
        <div className={styles.market_info_container}>
            <h3>Market Info</h3>
            <div className={styles.market_info}>
                <div className={styles.market_info_left}>
                    <div className={styles.market_row}>
                        <p>Market Cap</p>
                        {coin.market_data?.market_cap ? (
                            <p className={styles.pricing}>
                                $
                                {coin.market_data.market_cap.usd.toLocaleString()}
                            </p>
                        ) : null}
                    </div>

                    <div className={styles.market_row}>
                        <p>Volume (24h)</p>
                        {coin.market_data?.total_volume ? (
                            <p className={styles.pricing}>
                                {coin.market_data.total_volume.usd.toLocaleString()}
                            </p>
                        ) : null}
                    </div>
                    <div className={styles.market_row}>
                        <p>24 High</p>
                        {coin.market_data?.high_24h ? (
                            <p className={styles.pricing}>
                                $
                                {coin.market_data.high_24h.usd.toLocaleString()}
                            </p>
                        ) : null}
                    </div>
                    <div className={styles.market_row}>
                        <p>24 Low</p>
                        {coin.market_data?.low_24h ? (
                            <p className={styles.pricing}>
                                ${coin.market_data.low_24h.usd.toLocaleString()}
                            </p>
                        ) : null}
                    </div>
                    <div className={styles.market_row}>
                        <p>Trust Score</p>
                        {coin.tickers ? (
                            <p className={styles.pricing}>
                                {coin.liquidity_score.toFixed(2)}
                            </p>
                        ) : null}
                    </div>
                </div>
                <div className={styles.market_info_right}>
                    {fully_diluted_val > 0 && (
                        <div className={styles.market_row}>
                            <p>Full Diluted Val</p>
                            <p className={styles.pricing}>
                                ${fully_diluted_val.toLocaleString()}
                            </p>
                        </div>
                    )}
                    <div className={styles.market_row}>
                        <p>Circulating Supply</p>
                        {coin.market_data?.circulating_supply ? (
                            <p className={styles.pricing}>
                                {coin.market_data.circulating_supply.toLocaleString()}
                            </p>
                        ) : null}
                    </div>
                    <div className={styles.market_row}>
                        <p>Total Supply</p>
                        {coin.market_data?.total_supply ? (
                            <p className={styles.pricing}>
                                {coin.market_data.total_supply.toLocaleString()}
                            </p>
                        ) : null}
                    </div>
                    <div className={styles.market_row}>
                        <p>Max Supply</p>
                        {coin.market_data?.max_supply !== null ? (
                            <p className={styles.pricing}>
                                {coin.market_data?.max_supply.toLocaleString()}
                            </p>
                        ) : (
                            <p>&infin;</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoinMarketInfo;
