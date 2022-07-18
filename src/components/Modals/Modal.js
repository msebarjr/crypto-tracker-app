import { createPortal } from "react-dom";

import styles from "../../styles/Modal.module.css";

function Modal({ onClose, children }) {
    return createPortal(
        <>
            <div className={styles.modal_overlay} onClick={onClose} />
            <div className={styles.modal}>{children}</div>
        </>,
        document.getElementById("portal")
    );
}

export default Modal;
