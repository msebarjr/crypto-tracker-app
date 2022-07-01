import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Card from "../components/UI/Card";
import LoginForm from "../components/Forms/LoginForm";
import Title from "../components/Title";

import { validateEmail, validatePassword } from "../utils/formValidation";

import styles from "../styles/Login.module.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [credentialsIsInvalid, setCredentialsIsInvalid] = useState({
        emailIsInvalid: false,
        passwordIsInvalid: false,
    });
    const [error, setError] = useState("");

    async function submitLoginHandler(email, password) {
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);

        if (!emailIsValid || !passwordIsValid) {
            setCredentialsIsInvalid({
                emailIsInvalid: !emailIsValid,
                passwordIsInvalid: !passwordIsValid,
            });

            return;
        }

        try {
            await login(email, password);
            navigate("/coins");
        } catch (e) {
            if (e.message === "Firebase: Error (auth/user-not-found).")
                setError("Email not found.");
            if (e.message === "Firebase: Error (auth/wrong-password).")
                setError("Incorrect Password");
        }
    }

    return (
        <Card style={styles.login_card}>
            <Title>Login</Title>
            {error && (
                <div className={styles.error_text}>
                    <p>{error}</p>
                </div>
            )}
            <LoginForm
                onSubmit={submitLoginHandler}
                credentialsIsInvalid={credentialsIsInvalid}
            />
        </Card>
    );
}

export default Login;
