import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import Button from "../UI/Button";

import styles from "../../styles/Dropdown.module.css";

function DropdownRow({ coinData, purchaseInfo }) {
    const [isProfit, setIsProfit] = useState(false);
    const [profitLossPercentage, setProfitLossPercentage] = useState(0);
    const [color, setColor] = useState("orange");

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

    const pricePaid = purchaseInfo.units * purchaseInfo.purchase_price;

    return (
        <tr className={styles.dropdown}>
            <td>
                <p>{purchaseInfo.purchase_date.toDate().toLocaleString()}</p>
            </td>
            <td>
                <p>{purchaseInfo.units}</p>
            </td>
            <td>
                <p>
                    $
                    {purchaseInfo.purchase_price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
            </td>
            <td>
                <p>
                    $
                    {pricePaid.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
            </td>
            <td style={{ color: color }}>
                {isProfit ? (
                    <div className={styles.profit_loss}>
                        <AiFillCaretUp />
                        <p>{profitLossPercentage.toFixed(2)}%</p>
                    </div>
                ) : (
                    <div className={styles.profit_loss}>
                        <AiFillCaretDown />
                        <p>{profitLossPercentage.toFixed(2)}%</p>
                    </div>
                )}
            </td>

            <td>
                <Button style={styles.sell_button}>Sell</Button>
            </td>
        </tr>
    );
}

export default DropdownRow;

/**
 * 100 @ 1 share
 * 105
 */
