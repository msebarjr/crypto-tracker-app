import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DropdownHeader from "../Table/DropdownHeader";
import DropdownRow from "../Table/DropdownRow";
import SellCoinModal from "../Modals/SellCoinModal";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

function CoinPurchasedDropdown({ currentCoin, coinData }) {
    const [openSellModal, setOpenSellModal] = useState(false);
    const [purchaseToSell, setPurchaseToSell] = useState({});

    const { currentUser } = useAuth();
    const { updateDocument, user, updateCoinSelling, deleteDocument } =
        useUser();

    useEffect(() => {
        if (openSellModal) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "visible";
    }, [openSellModal]);

    function closeSellModalHandler() {
        setOpenSellModal(false);
    }

    function openSellModalHandler(purchaseSelling) {
        setOpenSellModal(true);
        setPurchaseToSell(purchaseSelling);
    }

    function sellCoinHandler(unitsToSell, total, purchaseId) {
        const newBalance = user.balance + Number(total);
        const newCoinTotalUnits =
            currentCoin.total_units_purchased - unitsToSell;
        const newPurchaseTotalUnits = purchaseToSell.units - unitsToSell;
        const otherPurchases = currentCoin.purchases.filter(
            (purchase) => purchase.id !== purchaseId
        );
        let updatedPurchases = [];
        let purchase = {};

        console.log(purchaseToSell);

        if (newPurchaseTotalUnits === 0) {
            updatedPurchases = otherPurchases;
        } else {
            purchase = {
                id: purchaseId,
                units: newPurchaseTotalUnits,
                purchase_price: purchaseToSell.purchase_price,
                purchase_date: purchaseToSell.purchase_date,
            };
            updatedPurchases = [...otherPurchases, purchase];
        }

        if (newCoinTotalUnits === 0)
            deleteDocument(currentUser.uid, currentCoin);
        else
            updateCoinSelling(currentUser.uid, currentCoin, {
                id: currentCoin.id,
                total_units_purchased: newCoinTotalUnits,
                name: currentCoin.name,
                purchases: updatedPurchases,
            });

        updateDocument(currentUser.uid, {
            balance: Number(newBalance.toFixed(2)),
        });

        toast.success(
            `Congratulations! You just sold ${unitsToSell} unit(s) of ${currentCoin.name}`
        );

        setOpenSellModal(false);
    }

    return (
        <>
            <DropdownHeader />
            {currentCoin.purchases.map((purchase, idx) => (
                <DropdownRow
                    key={idx}
                    coinData={coinData}
                    purchaseInfo={purchase}
                    openSellModal={openSellModalHandler}
                />
            ))}

            {openSellModal && (
                <SellCoinModal
                    currentPurchaseData={currentCoin}
                    coinSellingData={coinData}
                    sellCoin={sellCoinHandler}
                    closeSellModal={closeSellModalHandler}
                    purchaseToSell={purchaseToSell}
                />
            )}
        </>
    );
}

export default CoinPurchasedDropdown;
