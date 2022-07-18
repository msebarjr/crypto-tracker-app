import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

import BuyCoinForm from "../Forms/BuyCoinForm";
import Modal from "./Modal";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

import styles from "../../styles/BuyCoinModal.module.css";

function BuyCoinModal({ closeBuyModal, coinBuying }) {
    const [favoriteCoins, setFavoriteCoins] = useState([]);
    const [coinsOwn, setCoinsOwn] = useState([]);

    const { currentUser } = useAuth();
    const { updateUser, updateDocument, user } = useUser();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setFavoriteCoins(doc.data().coinsWatching);
            setCoinsOwn(doc.data().coinsOwn);
            updateUser(doc.data());
        });

        return () => {
            unsub();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.uid]);

    function buyCoin(units, total) {
        const coins = favoriteCoins.filter(
            (favCoin) => favCoin !== coinBuying.id
        );
        const newBalance = user.balance - total;
        updateDocument(currentUser.uid, {
            coinsWatching: coins,
            balance: newBalance,
        });
        toast.success(
            `Congratulations! You just purchased ${units} units of ${coinBuying.name}`
        );
        closeBuyModal();
    }

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
