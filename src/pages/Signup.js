import Card from "../components/UI/Card";
import LoginForm from "../components/Forms/LoginForm";
import Title from "../components/Title";

import styles from "../styles/Login.module.css";
import SignupForm from "../components/Forms/SignupForm";

function Signup() {
    return (
        <Card style={styles.login_card}>
            <Title>Sign Up</Title>
            <SignupForm />
        </Card>
    );
}

export default Signup;
