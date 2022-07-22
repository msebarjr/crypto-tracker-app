import Button from "../UI/Button";

import styles from "../../styles/CoinPurchasedDropdown.module.css";

function CoinPurchasedDropdown({ currentCoin, coinData }) {
    return (
        <>
            <tr className={styles.dropdown}>
                <td>
                    <p className={styles.data_title}>Date</p>
                </td>
                <td>
                    <p className={styles.data_title}>Units</p>
                </td>
                <td>
                    <p className={styles.data_title}>Price</p>
                </td>
                <td>
                    <p className={styles.data_title}>Total</p>
                </td>
                <td>
                    <p className={styles.data_title}>Revenue</p>
                </td>
                <td></td>
            </tr>
            <tr className={styles.dropdown}>
                <td>
                    <p className={styles.data}>Jan. 5, 2025</p>
                </td>
                <td>
                    <p className={styles.data}>4</p>
                </td>
                <td>
                    <p className={styles.data}>$1,250.25</p>
                </td>
                <td>
                    <p className={styles.data}>$23,412.56</p>
                </td>
                <td>
                    <p className={styles.data}>^ 3.7%</p>
                </td>
                <td>
                    <Button style={styles.sell_button}>Sell</Button>
                </td>
            </tr>
        </>
    );
}

export default CoinPurchasedDropdown;
