import { AiOutlineClose } from "react-icons/ai";

import Modal from "./Modal";
import SellCoinForm from "../Forms/SellCoinForm";

import styles from "../../styles/CoinModal.module.css";

function SellCoinModal({
    closeSellModal,
    coinSellingData,
    currentPurchaseData,
    purchaseToSell,
    sellCoin
}) {
    return (
        <Modal onClose={closeSellModal}>
            <header className={styles.header}>
                <div className={styles.coin_info}>
                    <img src={coinSellingData.image} alt={coinSellingData.id} />
                    <p>{coinSellingData.name}</p>
                </div>
                <AiOutlineClose onClick={closeSellModal} />
            </header>
            <main className={styles.modal_main}>
                <p className={styles.balance}>
                    Units Owned: {purchaseToSell.units}
                </p>
                <SellCoinForm
                    coinSellingData={coinSellingData}
                    totalUnitsOwned={purchaseToSell.units}
                    closeSellModal={closeSellModal}
                    sellCoin={sellCoin}
                />
            </main>
        </Modal>
    );
}

export default SellCoinModal;
