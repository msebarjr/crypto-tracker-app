import styles from "../../styles/Button.module.css";

function Button({ children, style }) {
    return (
        <button className={[`${styles.button} ${style}`]}> {children} </button>
    );
}

export default Button;
