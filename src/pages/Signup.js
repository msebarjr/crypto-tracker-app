import { useState } from "react";

import Card from "../components/UI/Card";
import SignupForm from "../components/Forms/SignupForm";
import Title from "../components/Title";

import { validateEmail, validatePassword } from "../utils/formValidation";

import styles from "../styles/Login.module.css";

function Signup() {
    const [credentialsIsInvalid, setCredentialsIsInvalid] = useState({
        emailIsInvalid: false,
        passwordIsInvalid: false,
    });

    function submitSignupHandler(email, password) {
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
            <Title>Sign Up</Title>
            <SignupForm
                onSubmit={submitSignupHandler}
                credentialsIsInvalid={credentialsIsInvalid}
            />
        </Card>
    );
}

export default Signup;
