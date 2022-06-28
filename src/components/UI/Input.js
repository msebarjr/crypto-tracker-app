import styles from "../../styles/Input.module.css";

function Input({ label, config, style }) {
    return (
        <div className={[`${styles.input} ${style}`]}>
            <label htmlFor={label}>{label}</label>
            <input {...config} />
        </div>
    );
}

export default Input;
