import styles from "../styles/Pagination.module.css";

function Pagination({ totalCoins, coinsPerPage, paginate, activePageNumber }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++)
        pageNumbers.push(i);

    return (
        <div className={styles.pagination_container}>
            <ul>
                <p>Page</p>
                {pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={
                            activePageNumber === page
                                ? [
                                      `${styles.page_number} ${styles.active_page}`,
                                  ]
                                : styles.page_number
                        }
                        onClick={paginate.bind(this, page)}
                    >
                        {page}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;
