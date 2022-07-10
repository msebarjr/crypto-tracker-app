import DOMPurify from "dompurify";

import styles from "../../styles/CoinInfo.module.css";

function CoinInfo({ coin }) {
    return (
        <div className={styles.coin_info_container}>
            <h3>Info</h3>
            <p
                className={styles.coin_info}
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                        coin.description ? coin.description.en : ""
                    ),
                }}
            />
        </div>
    );
}

export default CoinInfo;
