import styles from "../styles/LoadingSpinner.module.css";

function LoadingSpinner() {
    return (
        <div className={styles.spinner_container}>
            <div className={styles.loading_spinner} />
        </div>
    );
}

export default LoadingSpinner;
