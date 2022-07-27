import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import uuid from "react-uuid";

import BuyCoinModal from "../components/Modals/BuyCoinModal";
import CoinsOwned from "../components/Coins/CoinsOwned";
import CoinsWatching from "../components/Coins/CoinsWatching";
import PieChart from "../components/PieChart";

import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/Portfolio.module.css";

function Portfolio({ coins }) {
    const [favoriteCoins, setFavoriteCoins] = useState([]);
    const [coinsOwn, setCoinsOwn] = useState([]);
    const [isBuyingOpen, setIsBuyingOpen] = useState(false);
    const [coinToBuy, setCoinToBuy] = useState({});
    const [filterChartBy, setFilterChartBy] = useState("units");
    const [chartLabels, setChartLabels] = useState([]);
    const [chartUnitsData, setChartUnitsData] = useState([]);
    const [chartInvestedData, setChartInvestedData] = useState([]);

    const { currentUser } = useAuth();
    const { updateUser, updateDocument, user, updateCoinPurchases } = useUser();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setFavoriteCoins(doc.data().coinsWatching);
            updateUser(doc.data());
        });

        const q = query(
            collection(db, `users/${currentUser.uid}`, "coinsPurchased")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const purchases = [];
            const labels = [];
            const totalUnitsPerCoin = [];

            const totalInvestedPerCoin = [];

            querySnapshot.forEach((doc) => {
                let total = 0;
                purchases.push(doc.data());
                labels.push(doc.data().id.toUpperCase());
                totalUnitsPerCoin.push(doc.data().total_units_purchased);

                doc.data().purchases.forEach(
                    (purchase) =>
                        (total += purchase.units * purchase.purchase_price)
                );

                totalInvestedPerCoin.push(total);
            });

            if (isBuyingOpen) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "visible";

            setCoinsOwn(purchases);
            setChartLabels(labels);
            setChartUnitsData(totalUnitsPerCoin);
            setChartInvestedData(totalInvestedPerCoin);
        });

        return () => {
            unsub();
            unsubscribe();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.uid, isBuyingOpen]);

    function openBuyModal(coinBuying) {
        setIsBuyingOpen(true);
        setCoinToBuy(coinBuying);
    }

    function closeBuyModal() {
        setIsBuyingOpen(false);
    }

    function filterChartHandler(e) {
        setFilterChartBy(e.target.value);
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
        <div className={styles.portfolio_container}>
            <div className={styles.welcome}>
                <h4>
                    Welcome, <span>{user.name}</span>
                </h4>
                <div className={styles.balance_wrapper}>
                    <p>Your Balance:</p>
                    <p className={styles.balance}>
                        ${user.balance?.toLocaleString()}
                    </p>
                </div>
            </div>
            <main className={styles.main}>
                <div className={styles.main__top}>
                    <CoinsWatching
                        coins={coins}
                        favoriteCoins={favoriteCoins}
                        openBuyModal={openBuyModal}
                    />
                    <div className={styles.charts}>
                        <PieChart
                            labels={chartLabels}
                            chartData={
                                filterChartBy === "units"
                                    ? chartUnitsData
                                    : chartInvestedData
                            }
                            title={
                                filterChartBy === "units"
                                    ? "Total Units"
                                    : "Total $ Invested"
                            }
                        />
                        {chartUnitsData.length > 0 && (
                            <div className={styles.filter}>
                                <label htmlFor="chartData">Filter Data:</label>
                                <select
                                    name="chartData"
                                    id="chart_data"
                                    onChange={filterChartHandler}
                                >
                                    <option value="units">Total Units</option>
                                    <option value="invested">
                                        Total $ Invested
                                    </option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <CoinsOwned coinsOwned={coinsOwn} coins={coins} />
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
