import Card from "../components/UI/Card";
import LoginForm from "../components/Forms/LoginForm";

import styles from "../styles/Login.module.css";
import Title from "../components/Title";

function Login() {
    return (
        <div className={styles.container}>
            <Card style={styles.login_card}>
                <Title>Login</Title>
                <LoginForm />
            </Card>
        </div>
    );
}

export default Login;
