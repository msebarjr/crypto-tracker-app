import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import Button from "../UI/Button";

import styles from "../../styles/Dropdown.module.css";

function DropdownRow({ coinData, purchaseInfo, openSellModal }) {
    const [isProfit, setIsProfit] = useState(false);
    const [profitLossPercentage, setProfitLossPercentage] = useState(0);
    const [color, setColor] = useState("orange");

    const pricePaid = purchaseInfo.units * purchaseInfo.purchase_price;

    useEffect(() => {
        coinData.current_price - purchaseInfo.purchase_price > 0
            ? setIsProfit(true)
            : setIsProfit(false);

        if (isProfit) {
            setProfitLossPercentage(
                ((coinData.current_price - purchaseInfo.purchase_price) /
                    purchaseInfo.purchase_price) *
                    100
            );
            setColor("green");
        } else if (!isProfit) {
            setProfitLossPercentage(
                ((purchaseInfo.purchase_price - coinData.current_price) /
                    purchaseInfo.purchase_price) *
                    100
            );
            setColor("red");
        }
    }, [coinData.current_price, isProfit, purchaseInfo.purchase_price]);

    function openSellModalHandler() {
        openSellModal(purchaseInfo);
    }

    return (
        <tr className={styles.dropdown}>
            <td>
                <p>{purchaseInfo.purchase_date.toDate().toDateString()}</p>
            </td>
            <td>
                <p>{purchaseInfo.units}</p>
            </td>
            <td className={styles.hide_tablet}>
                <p>
                    $
                    {purchaseInfo.purchase_price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                    })}
                </p>
            </td>
            <td className={styles.hide_mobile}>
                <p>
                    $
                    {pricePaid.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                    })}
                </p>
            </td>
            <td style={{ color: color }}>
                {isProfit ? (
                    <div className={styles.profit_loss}>
                        <AiFillCaretUp className={styles.hide_mobile} />
                        <p>{profitLossPercentage.toFixed(2)}%</p>
                    </div>
                ) : (
                    <div className={styles.profit_loss}>
                        <AiFillCaretDown className={styles.hide_mobile} />
                        <p>{profitLossPercentage.toFixed(2)}%</p>
                    </div>
                )}
            </td>

            <td>
                <Button
                    style={styles.sell_button}
                    onClick={openSellModalHandler}
                >
                    Sell
                </Button>
            </td>
        </tr>
    );
}

export default DropdownRow;
