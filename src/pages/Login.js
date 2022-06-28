import Card from "../components/UI/Card";
import LoginForm from "../components/Forms/LoginForm";
import Title from "../components/Title";

import styles from "../styles/Login.module.css";

function Login() {
    return (
        <Card style={styles.login_card}>
            <Title>Login</Title>
            <LoginForm />
        </Card>
    );
}

export default Login;
