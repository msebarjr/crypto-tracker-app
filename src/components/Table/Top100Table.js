import Top100Row from "./Top100Row";

import styles from "../../styles/Top100Table.module.css";

function Top100Table({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Coin</th>
                    <th className={styles.hide_mobile}>Symbol</th>
                    <th> Price</th>
                    <th>24h</th>
                    <th className={styles.hide_tablet}>24h Volume</th>
                    <th className={styles.hide_tablet}>Mkt</th>
                    <th className={styles.hide_mobile}>Last 7 Days</th>
                </tr>
            </thead>
            <tbody>
                {data.map((coin) => (
                    <Top100Row key={coin.id} coin={coin} />
                ))}
            </tbody>
        </table>
    );
}

export default Top100Table;
