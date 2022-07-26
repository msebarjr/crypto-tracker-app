import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "../../styles/LoginForm.module.css";

function LoginForm({ onSubmit, credentialsIsInvalid }) {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const { emailIsInvalid, passwordIsInvalid } = credentialsIsInvalid;

    function emailInputHandler(e) {
        setEnteredEmail(e.target.value);
    }

    function passwordInputHandler(e) {
        setEnteredPassword(e.target.value);
    }

    function loginHandler(e) {
        e.preventDefault();
        onSubmit(enteredEmail, enteredPassword);
    }

    function demoLoginHandler(e) {
        e.preventDefault();
    }

    return (
        <form>
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

            <Button style={styles.login_button} onClick={loginHandler}>
                Login
            </Button>
            <Button style={styles.demo_login_button} onClick={demoLoginHandler}>
                Demo Login
            </Button>

            <p className={styles.no_account}>
                Don't have an account?{" "}
                <Link to="/signup" className="link">
                    <span>Sign Up</span>
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;
