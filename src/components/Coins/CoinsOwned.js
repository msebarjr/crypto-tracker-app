import Card from "../UI/Card";
import CoinsOwnedTable from "../Table/CoinsOwnedTable";

import styles from "../../styles/CoinsOwned.module.css";

function CoinsOwned({ coinsOwn, coins }) {  

    return (
        <div className={styles.coins_owned}>
            <h4>Coins Owned</h4>
            <Card style={styles.coins_owned_card}>
                {coinsOwn.length === 0 ? (
                    <div className={styles.no_coins}>
                        <p>You do not own any coins!</p>
                    </div>
                ) : (
                    <CoinsOwnedTable coinsOwn={coinsOwn} coins={coins} />
                )}
            </Card>
        </div>
    );
}

export default CoinsOwned;
