import Card from "../UI/Card";

import styles from "../../styles/Top100Coins.module.css";

function Top100Coins({ coins }) {
    return <Card style={styles.top_100_card}> </Card>;
}

export default Top100Coins;

/**
 * star
 * #
 * image - name
 * symbol
 * 24hr
 * 24hr volume
 * mkt
 * last 7 days sparkline
 */
