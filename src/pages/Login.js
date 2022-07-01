import { useState } from "react";

import Card from "../components/UI/Card";
import LoginForm from "../components/Forms/LoginForm";
import Title from "../components/Title";

import { validateEmail, validatePassword } from "../utils/formValidation";

import styles from "../styles/Login.module.css";

function Login() {
    const [credentialsIsInvalid, setCredentialsIsInvalid] = useState({
        emailIsInvalid: false,
        passwordIsInvalid: false,
    });

    function submitLoginHandler(email, password) {
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);

        if (!emailIsValid || !passwordIsValid) {
            setCredentialsIsInvalid({
                emailIsInvalid: !emailIsValid,
                passwordIsInvalid: !passwordIsValid,
            });

            return;
        }
    }

    return (
        <Card style={styles.login_card}>
            <Title>Login</Title>
            <LoginForm
                onSubmit={submitLoginHandler}
                credentialsIsInvalid={credentialsIsInvalid}
            />
        </Card>
    );
}

export default Login;
