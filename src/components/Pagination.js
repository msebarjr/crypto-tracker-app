import { useState } from "react";
import styles from "../styles/Pagination.module.css";

function Pagination({ totalCoins, coinsPerPage, paginate, numberOfResults }) {
    const [activePage, setActivePage] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++)
        pageNumbers.push(i);

    function setActivePageHandler(page) {
        setActivePage(page);
        paginate(page);
    }

    function resultHandler(number) {
        numberOfResults(number);
        setActivePage(1);
    }

    return (
        <div className={styles.pagination_container}>
            <div className={styles.results}>
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
            <ul>
                <p>Page</p>
                {pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={
                            activePage === page
                                ? [
                                      `${styles.page_number} ${styles.active_page}`,
                                  ]
                                : styles.page_number
                        }
                        onClick={setActivePageHandler.bind(this, page)}
                    >
                        {page}
                    </li>
                ))}
            </ul>
            <div>
                <p>Total Results: {totalCoins}</p>
            </div>
        </div>
    );
}

export default Pagination;
