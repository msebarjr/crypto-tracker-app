import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import styles from "../styles/Portfolio.module.css";

function Portfolio() {
    const { user } = useUser();

    return (
        <div className={styles.portfolio_container}>
            <h3>
                Welcome, <span>{user.name}</span>
            </h3>
        </div>
    );
}

export default Portfolio;
