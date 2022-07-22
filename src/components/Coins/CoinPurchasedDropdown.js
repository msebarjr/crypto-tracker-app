import DropdownHeader from "../Table/DropdownHeader";
import DropdownRow from "../Table/DropdownRow";

function CoinPurchasedDropdown({ currentCoin, coinData }) {
    return (
        <>
            <DropdownHeader />
            {currentCoin.purchases.map((purchase, idx) => (
                <DropdownRow
                    key={purchase.idx}
                    coinData={coinData}
                    purchaseInfo={purchase}
                />
            ))}
        </>
    );
}

export default CoinPurchasedDropdown;
