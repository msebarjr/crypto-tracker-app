import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/UI/Card";
import SignupForm from "../components/Forms/SignupForm";
import Title from "../components/Title";

import { validateEmail, validatePassword } from "../utils/formValidation";
import { useAuth } from "../contexts/AuthContext";

import styles from "../styles/Login.module.css";

function Signup() {
    const [credentialsIsInvalid, setCredentialsIsInvalid] = useState({
        emailIsInvalid: false,
        passwordIsInvalid: false,
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { signup } = useAuth();

    async function submitSignupHandler(email, password) {
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);

        setError("");

        if (!emailIsValid || !passwordIsValid) {
            setCredentialsIsInvalid({
                emailIsInvalid: !emailIsValid,
                passwordIsInvalid: !passwordIsValid,
            });

            return;
        }

        try {
            await signup(email, password);
            navigate("/coins");
        } catch (e) {
            if (e.message === "Firebase: Error (auth/email-already-in-use).")
                setError("An account has been created with that email already");
        }
    }

    return (
        <Card style={styles.login_card}>
            <Title>Sign Up</Title>
            {error && (
                <div className={styles.error_text}>
                    <p>{error}</p>
                </div>
            )}
            <SignupForm
                onSubmit={submitSignupHandler}
                credentialsIsInvalid={credentialsIsInvalid}
            />
        </Card>
    );
}

export default Signup;
