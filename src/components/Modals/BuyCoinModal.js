import { AiOutlineClose } from "react-icons/ai";

import BuyCoinForm from "../Forms/BuyCoinForm";
import Modal from "./Modal";

import { useUser } from "../../contexts/UserContext";

import styles from "../../styles/CoinModal.module.css";
import { useEffect } from "react";

function BuyCoinModal({ closeBuyModal, coinBuying, buyCoin }) {
    const { user } = useUser();

    useEffect(() => {
        console.log(coinBuying);
    }, [coinBuying]);

    return (
        <Modal onClose={closeBuyModal}>
            <header className={styles.header}>
                <div className={styles.coin_info}>
                    <img src={coinBuying.image} alt={coinBuying.id} />
                    <p>{coinBuying.name}</p>
                </div>
                <AiOutlineClose onClick={closeBuyModal} />
            </header>
            <main className={styles.modal_main}>
                <p className={styles.balance}>
                    Balance: ${user.balance.toLocaleString()}
                </p>
                <BuyCoinForm
                    closeBuyModal={closeBuyModal}
                    buyCoin={buyCoin}
                    coinBuying={coinBuying}
                />
            </main>
        </Modal>
    );
}

export default BuyCoinModal;
