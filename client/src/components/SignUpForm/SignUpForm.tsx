import { useState } from "react";
import styles from "./SignUp.module.css";
import Button from "../Button/Button";

interface SignUpData {
    email: string;
    password: string;
    confirmPassword: string;
}

function SignUpForm() {
    // Rerender the fields when they are updated, will be used to send the info to the backend
    const [signUpData, setSignUpData] = useState<SignUpData>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Update the value of signUpData when the user modifies one field input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    // Do a first validation of the input values then send the signUpData to the back
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("TO DO");
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                    Mot de passe
                </label>
                <input
                    type="password"
                    name="password"
                    value={signUpData.password}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="confirmPassword" className={styles.label}>
                    Confirmer mot de passe
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            <Button
                variant="primary"
                className={styles.inscriptionBtn}
                type="submit"
            >
                Inscription
            </Button>
        </form>
    );
}

export default SignUpForm;
