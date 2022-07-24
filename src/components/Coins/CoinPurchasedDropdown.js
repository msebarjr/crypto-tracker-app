import { useState } from "react";

import DropdownHeader from "../Table/DropdownHeader";
import DropdownRow from "../Table/DropdownRow";
import SellCoinModal from "../Modals/SellCoinModal";

function CoinPurchasedDropdown({ currentCoin, coinData }) {
    const [openSellModal, setOpenSellModal] = useState(false);
    const [purchaseToSell, setPurchaseToSell] = useState({});

    function closeSellModalHandler() {
        setOpenSellModal(false);
    }

    function openSellModalHandler(purchaseSelling) {
        setOpenSellModal(true);
        setPurchaseToSell(purchaseSelling);
        console.log("Purchase Selling: ", purchaseSelling);
        console.log("Current Coin: ", currentCoin);
        console.log("Coin Data: ", coinData);
        console.log(typeof purchaseSelling.units);
    }

    function sellCoinHandler(unitsToSell, total) {
        console.log("Units to Sell: ", unitsToSell);
        console.log("Total: ", total);
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
