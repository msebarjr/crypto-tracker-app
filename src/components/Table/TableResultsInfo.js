import styles from "../../styles/TableResultsInfo.module.css";

function TableResultsInfo({
    numberOfResults,
    totalCoins,
    coinsPerPage,
    resetActivePage,
}) {
    function resultHandler(number) {
        numberOfResults(number);
        resetActivePage();
    }

    return (
        <div className={styles.results_info_container}>
            <div className={styles.results_pp}>
                <p>Results per page</p>
                <ul>
                    <li
                        className={
                            coinsPerPage === 5
                                ? [
                                      `${styles.page_number} ${styles.active_page}`,
                                  ]
                                : styles.page_number
                        }
                        onClick={resultHandler.bind(this, 5)}
                    >
                        5
                    </li>
                    <li
                        className={
                            coinsPerPage === 10
                                ? [
                                      `${styles.page_number} ${styles.active_page}`,
                                  ]
                                : styles.page_number
                        }
                        onClick={resultHandler.bind(this, 10)}
                    >
                        10
                    </li>
                </ul>
            </div>
            <p className={`${styles.results} ${styles.sm_text}`}>
                Total Results: {totalCoins}
            </p>
        </div>
    );
}

export default TableResultsInfo;
