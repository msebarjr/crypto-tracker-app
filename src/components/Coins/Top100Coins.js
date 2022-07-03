import Card from "../UI/Card";
import Top100Table from "../Table/Top100Table";

import styles from "../../styles/Top100Coins.module.css";

function Top100Coins({ coins }) {
    return (
        <Card style={styles.top_100_card}>
            {coins.length === 0 ? (
                <div className={styles.no_coins}>
                    <p>No Coins Found!</p>
                </div>
            ) : (
                <Top100Table data={coins} />
            )}
        </Card>
    );
}

export default Top100Coins;
