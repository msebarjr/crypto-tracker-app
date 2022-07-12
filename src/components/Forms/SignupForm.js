import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "../../styles/LoginForm.module.css";

function SignupForm({ onSubmit, credentialsIsInvalid }) {
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const { nameIsInvalid, emailIsInvalid, passwordIsInvalid } =
        credentialsIsInvalid;

    function nameInputHandler(e) {
        setEnteredName(e.target.value);
    }

    function emailInputHandler(e) {
        setEnteredEmail(e.target.value);
    }

    function passwordInputHandler(e) {
        setEnteredPassword(e.target.value);
    }

    function signupHandler(e) {
        e.preventDefault();
        onSubmit(enteredName, enteredEmail, enteredPassword);
    }

    return (
        <form onSubmit={signupHandler}>
            <Input
                label="Name:"
                config={{ type: "text", placeholder: "First Name" }}
                style={styles.login_input}
                onChange={nameInputHandler}
                value={enteredName}
                isInvalid={nameIsInvalid}
                invalidText="Name must be atleast 2 characters long!"
            />
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
