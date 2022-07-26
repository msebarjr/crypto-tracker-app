import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { RiCoinsLine } from "react-icons/ri";
import { useNavigate, NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

import Button from "./UI/Button";

import styles from "../styles/Navbar.module.css";

function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [toggleIcon, setToggleIcon] = useState(false);

    const activeLink = {
        color: "rgba(33, 33, 33, 1)",
        backgroundColor: "rgba(242, 169, 0, 1)",
    };
    const link = {
        backgroundColor: "rgba(33, 33, 33, 1)",
        color: "rgba(242, 169, 0, 1)",
    };

    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    function closeMobileHandler() {
        setIsMobile(false);
        setToggleIcon(false);
    }

    function togglerHandler() {
        setIsMobile(!isMobile);
        setToggleIcon(!toggleIcon);
    }

    async function handleLogout() {
        try {
            setIsMobile(false);
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
                    <ul
                        className={
                            isMobile
                                ? [`${styles.nav_menu} ${styles.nav_active}`]
                                : styles.nav_menu
                        }
                    >
                        <NavLink
                            exact="true"
                            to="/coins"
                            className={styles.nav_item}
                            style={({ isActive }) =>
                                isActive ? activeLink : link
                            }
                            onClick={closeMobileHandler}
                        >
                            <li>Coins</li>
                        </NavLink>
                        <NavLink
                            exact="true"
                            to="/portfolio"
                            className={styles.nav_item}
                            style={({ isActive }) =>
                                isActive ? activeLink : link
                            }
                            onClick={closeMobileHandler}
                        >
                            <li>Portfolio</li>
                        </NavLink>
                        <li>
                            <Button
                                onClick={handleLogout}
                                style={styles.logout_button}
                            >
                                Logout
                            </Button>
                        </li>
                    </ul>
                    <div
                        className={
                            toggleIcon
                                ? [`${styles.nav_toggler} ${styles.toggle}`]
                                : styles.nav_toggler
                        }
                        onClick={togglerHandler}
                    >
                        <div className={styles.line1}></div>
                        <div className={styles.line2}></div>
                        <div className={styles.line3}></div>
                    </div>
                </>
            )}
        </nav>
    );
}

export default Navbar;
