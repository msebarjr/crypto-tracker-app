import Card from "../components/UI/Card";
import SignupForm from "../components/Forms/SignupForm";
import Title from "../components/Title";

import styles from "../styles/Login.module.css";

function Signup() {
    return (
        <Card style={styles.login_card}>
            <Title>Sign Up</Title>
            <SignupForm />
        </Card>
    );
}

export default Signup;
