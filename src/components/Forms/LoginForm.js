import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "../../styles/LoginForm.module.css";

function LoginForm() {
    return (
        <form>
            <Input
                label="Email:"
                config={{ type: "email", placeholder: "Enter your email" }}
            />
            <Input
                label="Password:"
                config={{
                    type: "password",
                    placeholder: "Enter your password",
                }}
            />
            <p className={styles.hint}>Must be atleast 6 characters.</p>
            <Button style={styles.login_button}>Login</Button>
            <Button style={styles.demo_login_button}>Demo Login</Button>
            <p className={styles.no_account}>
                Don't have an account? <span>Sign Up</span>
            </p>
        </form>
    );
}

export default LoginForm;
