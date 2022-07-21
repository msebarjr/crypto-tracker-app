import { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";

import { useUser } from "../../contexts/UserContext";

import styles from "../../styles/BuyCoinForm.module.css";

function BuyCoinForm({ closeBuyModal, coinBuying, buyCoin }) {
    const [unitsEntered, setUnitsEntereds] = useState(0);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { user } = useUser();

    let total = unitsEntered * coinBuying.current_price;

    function unitsHandler(e) {
        setUnitsEntereds(e.target.value);
    }

    function buyCoinSubmit() {
        if (user.balance - total < 0) {
            setError(true);
            setErrorMessage("You do not have enough funds!");
            return;
        }

        if (unitsEntered <= 0) {
            setError(true);
            setErrorMessage("Must enter a valid unit!");
            return;
        }

        setError(false);
        buyCoin(Number(unitsEntered), total.toFixed(2));
    }

    return (
        <div className={styles.buy_coin_form}>
            <div className={styles.units_container}>
                <Input
                    label="# Units"
                    style={styles.units_input}
                    config={{ type: "number", value: 1, min: 0.25, step: 0.25 }}
                    value={unitsEntered}
                    onChange={unitsHandler}
                    isInvalid={error}
                />
                <span>X</span>
                <Input
                    label="Market Value"
                    disabled={true}
                    config={{
                        placeholder: `$${coinBuying.current_price.toLocaleString(
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
            {error && <p className={styles.purchase_error}>{errorMessage}</p>}
            <div className={styles.buy_actions}>
                <Button style={styles.buy_button} onClick={buyCoinSubmit}>
                    Buy
                </Button>
                <Button style={styles.cancel_button} onClick={closeBuyModal}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default BuyCoinForm;
