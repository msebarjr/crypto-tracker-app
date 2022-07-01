import { Link } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "../../styles/LoginForm.module.css";
import { useState } from "react";

function SignupForm({ onSubmit, credentialsIsInvalid }) {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const { emailIsInvalid, passwordIsInvalid } = credentialsIsInvalid;

    function emailInputHandler(e) {
        setEnteredEmail(e.target.value);
    }

    function passwordInputHandler(e) {
        setEnteredPassword(e.target.value);
    }

    function signupHandler(e) {
        e.preventDefault();
        onSubmit(enteredEmail, enteredPassword);
    }

    return (
        <form onSubmit={signupHandler}>
            <Input
                label="Email:"
                config={{ type: "email", placeholder: "Enter your email" }}
                style={styles.login_input}
                onChange={emailInputHandler}
                value={enteredEmail}
                isInvalid={emailIsInvalid}
                invalidText="Please enter a valid email!"
            />
            <Input
                label="Password:"
                config={{
                    type: "password",
                    placeholder: "Enter your password",
                }}
                style={styles.login_input}
                onChange={passwordInputHandler}
                value={enteredPassword}
                isInvalid={passwordIsInvalid}
            />
            <p
                className={[
                    passwordIsInvalid
                        ? `${styles.hint}  ${styles.invalid}`
                        : styles.hint,
                ]}
            >
                Must be atleast 6 characters.
            </p>
            <Button style={styles.login_button}>Create Account</Button>
            <p className={styles.no_account}>
                Already have an account?{" "}
                <Link to="/" className="link">
                    <span>Login</span>
                </Link>
            </p>
        </form>
    );
}

export default SignupForm;
