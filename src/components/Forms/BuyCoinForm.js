import { useState } from "react";

import Input from "../UI/Input";

import styles from "../../styles/BuyCoinForm.module.css";
import Button from "../UI/Button";

function BuyCoinForm({ closeBuyModal }) {
    const [unitsEntered, setUnitsEntereds] = useState(0);

    function unitsHandler(e) {
        setUnitsEntereds(e.target.value);
    }

    function buyCoinSubmitHandler(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={buyCoinSubmitHandler} className={styles.buy_coin_form}>
            <div className={styles.units_container}>
                <Input
                    label="# Units"
                    style={styles.units_input}
                    config={{ type: "number", placeholder: 0 }}
                    value={unitsEntered}
                    onChange={unitsHandler}
                />
                <span>X</span>
                <Input
                    label="Market Value"
                    disabled={true}
                    config={{ placeholder: `$5.00` }}
                    style={styles.market_value}
                />
            </div>
            <div className={styles.total_container}>
                <span>=</span>
                <Input
                    label="Total"
                    disabled={true}
                    config={{ placeholder: `$15.00` }}
                    style={styles.buy_total}
                />
            </div>
            <p className={styles.balance}>Balance: $50,000</p>
            <div className={styles.buy_actions}>
                <Button style={styles.buy_button}>Buy</Button>
                <Button style={styles.cancel_button} onClick={closeBuyModal}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default BuyCoinForm;
