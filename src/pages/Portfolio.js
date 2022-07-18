import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import BuyCoinModal from "../components/Modals/BuyCoinModal";
import CoinsOwned from "../components/Coins/CoinsOwned";
import CoinsWatching from "../components/Coins/CoinsWatching";

import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/Portfolio.module.css";

function Portfolio({ coins }) {
    const [favoriteCoins, setFavoriteCoins] = useState([]);
    const [coinsOwn, setCoinsOwn] = useState([]);
    const [isBuyingOpen, setIsBuyingOpen] = useState(false);
    const [coinToBuy, setCoinToBuy] = useState({});
    // const [isSellingOpen, setIsSellingOpen] = useState(false);

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

    function openBuyModal(coinBuying) {
        setIsBuyingOpen(true);
        setCoinToBuy(coinBuying);
    }

    function closeBuyModal() {
        setIsBuyingOpen(false);
    }

    function buyCoinHandler(units, total) {
        const coins = favoriteCoins.filter(
            (favCoin) => favCoin !== coinToBuy.id
        );
        const newBalance = user.balance - total;
        const updatedCoinsOwn = [
            ...coinsOwn,
            {
                id: coinToBuy.id,
                purchases: [
                    {
                        units,
                        price_bought_at: coinToBuy.current_price,
                        purchase_date: new Date(),
                    },
                ],
            },
        ];

        updateDocument(currentUser.uid, {
            coinsWatching: coins,
            balance: Number(newBalance.toFixed(2)),
            coinsOwn: updatedCoinsOwn,
        });
        toast.success(
            `Congratulations! You just purchased ${units} units of ${coinToBuy.name}`
        );
        closeBuyModal();
    }

    return (
        <div className={styles.portfolio_container}>
            <div className={styles.welcome}>
                <h4>
                    Welcome, <span>{user.name}</span>
                </h4>
                <div className={styles.balance_wrapper}>
                    <p>Your Balance:</p>
                    <p className={styles.balance}>
                        ${user.balance.toLocaleString()}
                    </p>
                </div>
            </div>
            <main className={styles.main}>
                <CoinsWatching
                    coins={coins}
                    favoriteCoins={favoriteCoins}
                    openBuyModal={openBuyModal}
                />
                <CoinsOwned coinsOwn={coinsOwn} coins={coins} />
            </main>
            {isBuyingOpen && (
                <BuyCoinModal
                    closeBuyModal={closeBuyModal}
                    coinBuying={coinToBuy}
                    buyCoin={buyCoinHandler}
                />
            )}
        </div>
    );
}

export default Portfolio;
