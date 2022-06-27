import styles from "../../styles/Card.module.css";

function Card({ children, style }) {
    return <div className={[`${styles.card} ${style}`]}>{children}</div>;
}

export default Card;
