import styles from "../../styles/Dropdown.module.css";

function DropdownHeader() {
    return (
        <tr className={styles.dropdown}>
            <td>
                <p className={styles.data_title}>Date</p>
            </td>
            <td>
                <p className={styles.data_title}>Units</p>
            </td>
            <td>
                <p className={styles.data_title}>Paid</p>
            </td>
            <td>
                <p className={styles.data_title}>Total</p>
            </td>
            <td>
                <p className={styles.data_title}>Revenue</p>
            </td>
            <td></td>
        </tr>
    );
}

export default DropdownHeader;
