import styles from "../../styles/Button.module.css";

function Button({ children, onClick, style }) {
    return (
        <button className={[`${styles.button} ${style}`]} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
