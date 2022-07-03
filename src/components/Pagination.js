import { useState } from "react";
import styles from "../styles/Pagination.module.css";

function Pagination({ totalCoins, coinsPerPage, paginate, from, to }) {
    const [activePage, setActivePage] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++)
        pageNumbers.push(i);

    function setActivePageHandler(page) {
        setActivePage(page);
        paginate(page);
    }

    return (
        <div className={styles.pagination_container}>
            <p>
                Showing results {from}-{to} of {totalCoins}
            </p>
            <ul>
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
        </div>
    );
}

export default Pagination;
