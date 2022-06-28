import Button from "../UI/Button";
import Input from "../UI/Input";

import styles from "../../styles/LoginForm.module.css";

function SignupForm() {
    return (
        <form>
            <Input
                label="Email:"
                config={{ type: "email", placeholder: "Enter your email" }}
                style={styles.login_input}
            />
            <Input
                label="Password:"
                config={{
                    type: "password",
                    placeholder: "Enter your password",
                }}
                style={styles.login_input}
            />
            <p className={styles.hint}>Must be atleast 6 characters.</p>
            <Input
                label="Confirm Password:"
                config={{
                    type: "password",
                    placeholder: "Confirm password",
                }}
                style={styles.login_input}
            />
            <Button style={styles.login_button}>Create Account</Button>
            <p className={styles.no_account}>
                Already have an account? <span>Login</span>
            </p>
        </form>
    );
}

export default SignupForm;
