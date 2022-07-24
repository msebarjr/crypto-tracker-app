import React, { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "../../styles/BuyCoinForm.module.css";

function SellCoinForm({
    totalUnitsOwned,
    coinSellingData,
    closeSellModal,
    sellCoin,
}) {
    const [unitsEntered, setUnitsEntereds] = useState(0);
    const [error, setError] = useState(false);

    const total = unitsEntered * coinSellingData.current_price;

    function unitsHandler(e) {
        setUnitsEntereds(e.target.value);
    }

    function sellPurchaseSubmit() {
        if (unitsEntered <= 0) {
            setError(true);
            return;
        }

        setError(false);
        sellCoin(Number(unitsEntered), total.toFixed(2));
    }

    return (
        <div className={styles.buy_coin_form}>
            <div className={styles.units_container}>
                <Input
                    label="# Units to Sell"
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
            {error && (
                <p className={styles.purchase_error}>
                    Units must be greater than 0!
                </p>
            )}
            <div className={styles.actions}>
                <Button style={styles.sell_button} onClick={sellPurchaseSubmit}>
                    Sell
                </Button>
                <Button style={styles.cancel_button} onClick={closeSellModal}>
                    Cancel
                </Button>
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
