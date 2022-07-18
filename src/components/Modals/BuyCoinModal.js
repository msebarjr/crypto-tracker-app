import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import BuyCoinForm from "../Forms/BuyCoinForm";
import Input from "../UI/Input";
import Modal from "./Modal";

import styles from "../../styles/BuyCoinModal.module.css";

function BuyCoinModal({ closeBuyModal }) {
    const [coinSearchInput, setCoinSearchInput] = useState("");

    function coinSearchInputHandler(e) {
        setCoinSearchInput(e.target.value);
    }

    return (
        <Modal onClose={closeBuyModal}>
            <header className={styles.header}>
                <h4>Buy Coin</h4>
                <AiOutlineClose onClick={closeBuyModal} />
            </header>
            <main className={styles.modal_main}>
                <div className={styles.search_input_container}>
                    <Input
                        config={{ type: "text", placeholder: "Search Coin.." }}
                        onChange={coinSearchInputHandler}
                        value={coinSearchInput}
                        style={styles.search_input}
                    />
                </div>
                <BuyCoinForm closeBuyModal={closeBuyModal} />
            </main>
        </Modal>
    );
}

export default BuyCoinModal;
