import { Sparklines, SparklinesLine } from "react-sparklines";

import styles from "../../styles/CoinSparkline.module.css";

function CoinSparkline({ data }) {
    return (
        <div className={styles.sparkline}>
            <Sparklines data={data}>
                <SparklinesLine color="rgba(73, 138, 213, 1)" />
            </Sparklines>
        </div>
    );
}

export default CoinSparkline;
