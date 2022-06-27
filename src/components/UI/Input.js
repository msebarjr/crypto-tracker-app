import styles from "../../styles/Input.module.css";

function Input({ label, config }) {
    return (
        <div className={styles.input}>
            <label htmlFor={label}>{label}</label>
            <input {...config} />
        </div>
    );
}

export default Input;
