import styles from "../../styles/Input.module.css";

function Input({
    label,
    config,
    onChange,
    isInvalid,
    invalidText,
    value,
    style,
}) {
    return (
        <div className={[`${styles.input} ${style}`]}>
            <label htmlFor={label}>{label}</label>
            <input
                {...config}
                onChange={onChange}
                value={value}
                className={isInvalid ? styles.invalid : undefined}
            />
            {isInvalid && <p className={styles.invalid_text}>{invalidText}</p>}
        </div>
    );
}

export default Input;
