import styles from "../../styles/Button.module.css";

function Button({ children, onClick, style, loading }) {
    return (
        <button className={[`${styles.button} ${style}`]} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
