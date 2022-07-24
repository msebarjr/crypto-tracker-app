import React, { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "../../styles/BuyCoinForm.module.css";

function SellCoinForm({ totalUnitsOwned, coinSellingData }) {
    const [unitsEntered, setUnitsEntereds] = useState(0);

    const total = unitsEntered * coinSellingData.current_price;

    function unitsHandler(e) {
        setUnitsEntereds(e.target.value);
    }

    return (
        <div className={styles.buy_coin_form}>
            <div className={styles.units_container}>
                <Input
                    label="# Units"
                    style={styles.units_input}
                    config={{
                        type: "number",
                        min: 0.25,
                        max: totalUnitsOwned,
                        step: 0.25,
                    }}
                    value={unitsEntered}
                    onChange={unitsHandler}
                />
                <span>X</span>
                <Input
                    label="Market Value"
                    disabled={true}
                    config={{
                        placeholder: `$${coinSellingData.current_price.toLocaleString(
                            undefined,
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}`,
                    }}
                    style={styles.market_value}
                />
            </div>
            <div className={styles.total_container}>
                <span>=</span>
                <Input
                    label="Total"
                    disabled={true}
                    config={{
                        placeholder: `$${total.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`,
                    }}
                    style={styles.buy_total}
                />
            </div>

            <div className={styles.buy_actions}>
                <Button style={styles.sell_button}>Sell</Button>
                <Button style={styles.cancel_button}>Cancel</Button>
            </div>
        </div>
    );
}

export default SellCoinForm;

/**
 *  Units Own
 *  Units to Sell
 *  Current Price
 *  Total Selling Price
 */
