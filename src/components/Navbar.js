import { RiCoinsLine } from "react-icons/ri";

import styles from "../styles/Navbar.module.css";
import Button from "./UI/Button";

function Navbar() {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <RiCoinsLine className={styles.icon} />
                    <p>
                        <span>Crypto</span>
                        Tracker
                    </p>
                    <RiCoinsLine className={styles.icon} />
                </div>
                <div className={styles.links}>
                    <Button style={styles.link}>Coins</Button>
                    <Button style={styles.link}>Portfolio</Button>
                </div>
                <div className={styles.logout}>
                    <Button style={styles.logout_button}>Logout</Button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
