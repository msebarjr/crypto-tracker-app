import { RiCoinsLine } from "react-icons/ri";

import styles from "../styles/Navigation.module.css";

function Navigation() {
    return (
        <header className={styles.nav}>
            <RiCoinsLine className={styles.icon} />
            <p>
                <span>Crypto</span>
                Tracker
            </p>
            <RiCoinsLine className={styles.icon} />
        </header>
    );
}

export default Navigation;
