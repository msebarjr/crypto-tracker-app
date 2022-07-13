import { useAuth } from "../contexts/AuthContext";
import { RiCoinsLine } from "react-icons/ri";
import { useNavigate, NavLink } from "react-router-dom";

import Button from "./UI/Button";

import styles from "../styles/Navbar.module.css";

function Navbar() {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const activeLink = {
        color: "rgba(33, 33, 33, 1)",
        backgroundColor: "rgba(242, 169, 0, 1)",
    };
    const link = {
        backgroundColor: "rgba(33, 33, 33, 1)",
        color: "rgba(242, 169, 0, 1)",
    };

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
                        <NavLink
                            exact
                            to="/coins"
                            className={styles.link}
                            style={({ isActive }) =>
                                isActive ? activeLink : link
                            }
                        >
                            Coins
                        </NavLink>
                        <NavLink
                            exact
                            to="/portfolio"
                            className={styles.link}
                            style={({ isActive }) =>
                                isActive ? activeLink : link
                            }
                        >
                            Portfolio
                        </NavLink>
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
