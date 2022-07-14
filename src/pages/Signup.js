import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/UI/Card";
import SignupForm from "../components/Forms/SignupForm";
import Title from "../components/Title";

import {
    validateEmail,
    validateName,
    validatePassword,
} from "../utils/formValidation";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

import styles from "../styles/Login.module.css";

function Signup() {
    const [credentialsIsInvalid, setCredentialsIsInvalid] = useState({
        nameIsInvalid: false,
        emailIsInvalid: false,
        passwordIsInvalid: false,
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { signup } = useAuth();
    const { addDocument } = useUser();

    async function submitSignupHandler(name, email, password) {
        const nameIsValid = validateName(name);
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);

        setError("");

        if (!emailIsValid || !passwordIsValid || !nameIsValid) {
            setCredentialsIsInvalid({
                nameIsInvalid: !nameIsValid,
                emailIsInvalid: !emailIsValid,
                passwordIsInvalid: !passwordIsValid,
            });

            return;
        }

        try {
            const res = await signup(email, password);
            const user = res.user;

            await addDocument(user, name, email);

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
