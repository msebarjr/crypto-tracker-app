import { useState, useEffect } from "react";
import {
    AiOutlineStar,
    AiFillStar,
    AiFillCaretDown,
    AiFillCaretUp,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import uuid from "react-uuid";

import Button from "../UI/Button";
import BuyCoinModal from "../Modals/BuyCoinModal";
import CoinSparkline from "./CoinSparkline";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

import styles from "../../styles/CoinStats.module.css";

function CoinStats({ coin, coins }) {
    const [isWatching, setIsWacthing] = useState(false);
    const [favoriteCoins, setFavoriteCoins] = useState([]);
    const [isBuyingOpen, setIsBuyingOpen] = useState(false);
    const [coinToBuy, setCoinToBuy] = useState({});
    const [coinsOwn, setCoinsOwn] = useState([]);

    const { currentUser } = useAuth();
    const { updateDocument, updateUser, user, updateCoinPurchases } = useUser();

    const priceColor =
        coin.market_data?.price_change_percentage_24h > 0
            ? "rgb(17, 233, 17)"
            : "red";

    useEffect(() => {
        console.log(coins);
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setFavoriteCoins(doc.data().coinsWatching);
            updateUser(doc.data());
        });

        const q = query(
            collection(db, `users/${currentUser.uid}`, "coinsPurchased")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const purchases = [];

            querySnapshot.forEach((doc) => {
                purchases.push(doc.data());
            });

            if (isBuyingOpen) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "visible";

            setCoinsOwn(purchases);
        });

        return () => {
            unsub();
            unsubscribe();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.uid, isBuyingOpen]);

    useEffect(() => {
        setIsWacthing(favoriteCoins.includes(coin.id));
    }, [favoriteCoins, coin.id]);

    function addCoinToFavorites() {
        const coins = [...favoriteCoins, coin.id];
        toast.info(`${coin.name} added to Favorites`);
        updateDocument(currentUser.uid, { coinsWatching: coins });
    }

    function removeCoinFromFavorites() {
        const coins = favoriteCoins.filter((favCoin) => favCoin !== coin.id);
        toast.error(`${coin.name} removed as Favorite`);
        updateDocument(currentUser.uid, { coinsWatching: coins });
    }

    function openBuyModal() {
        const buying = coins.filter((c) => c.id === coin.id);

        setCoinToBuy(buying[0]);
        setIsBuyingOpen(true);
    }

    function closeBuyModal() {
        setIsBuyingOpen(false);
    }

    function buyCoinHandler(units, total) {
        const newBalance = user.balance - total;
        let newTotalUnits = 0;
        let coinDupData;
        let previousPurchases = [];

        const coinDuplicate = coinsOwn.filter(
            (coin) => coin.id === coinToBuy.id
        );

        if (coinDuplicate.length > 0) {
            coinDupData = coinDuplicate.pop();
            newTotalUnits = coinDupData.total_units_purchased + units;
            previousPurchases = coinDupData.purchases;
        } else newTotalUnits = units;

        updateCoinPurchases(currentUser.uid, coinToBuy, {
            id: coinToBuy.id,
            total_units_purchased: newTotalUnits,
            name: coinToBuy.name,
            purchases: [
                ...previousPurchases,
                {
                    id: uuid(),
                    units: units,
                    purchase_price: coinToBuy.current_price,
                    purchase_date: new Date(),
                },
            ],
        });

        updateDocument(currentUser.uid, {
            balance: Number(newBalance.toFixed(2)),
        });

        toast.success(
            `Congratulations! You just purchased ${units} units of ${coinToBuy.name}`
        );

        setIsBuyingOpen(false);
    }

    return (
        <div className={styles.stats_container}>
            <div className={styles.rank}>
                <p>Rank # {coin?.market_cap_rank}</p>
            </div>
            <div className={styles.title_price_wrapper}>
                <div className={styles.title}>
                    <img src={coin.image?.small} alt={coin.id} />
                    <p className={styles.coin_title}>{coin?.name}</p>
                    <p>({coin.symbol?.toUpperCase()})</p>
                </div>
                <div className={styles.price}>
                    {coin.market_data?.current_price ? (
                        <p className={styles.price_current_price}>
                            $
                            {coin.market_data.current_price.usd.toLocaleString()}
                        </p>
                    ) : null}
                    <div
                        className={styles.price_change}
                        style={{ color: priceColor }}
                    >
                        {coin.market_data?.price_change_percentage_24h > 0 ? (
                            <AiFillCaretUp className={styles.icon} />
                        ) : (
                            <AiFillCaretDown className={styles.icon} />
                        )}
                        <p className={styles.change_percentage}>
                            {coin.market_data?.price_change_percentage_24h.toFixed(
                                1
                            )}
                            %
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <Button style={styles.buy_button} onClick={openBuyModal}>
                    Buy
                </Button>

                {isWatching ? (
                    <div className={styles.watching}>
                        <AiFillStar
                            size={24}
                            className={[`${styles.fav} ${styles.star}`]}
                            onClick={removeCoinFromFavorites}
                        />
                        <p>Watching</p>
                    </div>
                ) : (
                    <AiOutlineStar
                        className={styles.star}
                        size={24}
                        onClick={addCoinToFavorites}
                    />
                )}
            </div>
            <CoinSparkline data={coin.market_data?.sparkline_7d.price} />
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

export default CoinStats;
