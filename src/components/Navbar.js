import { useAuth } from "../contexts/AuthContext";
import { RiCoinsLine } from "react-icons/ri";

import Button from "./UI/Button";

import styles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("./");
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <RiCoinsLine className={styles.icon} />
                <p>
                    <span>Crypto</span>
                    Tracker
                </p>
                <RiCoinsLine className={styles.icon} />
            </div>
            {currentUser && (
                <>
                    <div className={styles.links}>
                        <Button style={styles.link}>Coins</Button>
                        <Button style={styles.link}>Portfolio</Button>
                    </div>
                    <div className={styles.logout}>
                        <Button
                            onClick={handleLogout}
                            style={styles.logout_button}
                        >
                            Logout
                        </Button>
                    </div>
                </>
            )}
        </nav>
    );
}

export default Navbar;
