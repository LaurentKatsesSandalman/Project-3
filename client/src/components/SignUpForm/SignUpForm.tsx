import axios from "axios";
import { useState } from "react";
import type { AppContextType } from "../../context/AppContext";
import Button from "../Button/Button";
import styles from "./SignUp.module.css";
import type { UserSignedUp, UserSignUp } from "../../types/users";

interface SignUpFormProps {
    setActiveModal: AppContextType["setIsSignUpActive"];
}

function SignUpForm({ setActiveModal }: SignUpFormProps) {
    // Rerender the fields when they are updated, will be used to send the info to the backend
    const [signUpData, setSignUpData] = useState<UserSignUp>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [newUser, setnewUser] = useState<UserSignedUp | null>(null);

    // Update the value of signUpData when the user modifies one field input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData((prev) => {
            return { ...prev, [name]: value };
        });
        setErrorMessage("");
    };

    // Do a first validation of the input values then send the signUpData to the back
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password, confirmPassword } = signUpData;
        e.preventDefault();

        if (password.length < 8) {
            setErrorMessage("Mot de passe de 8 caractères minimum");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Mots de passe ne correspondent pas");
            return;
        }

        // Axio is used to make HTTP request more readable than fetch (automaticcaly parses JSON, better error handling)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_QUICKY_API_URL}/api/users`,
                {
                    email: email,
                    password: password,
                }
            );

            setnewUser(response.data);
            setActiveModal(false);
        } catch (err: any) {
            // TO DO, backend error handling and display using status code
            if (err.response.status === 409) {
                setErrorMessage("Email déjà utilisé");
                return;
            }
            console.error("Erreur lors du fetch:", err);
            setErrorMessage("Ne passe pas les validations");
        }
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
                    data-testid="email-input"
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
                    data-testid="password-input"
                    value={signUpData.password}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <p className={styles.expectedInput}>8 caractères minimum</p>
            </div>
            <div className={styles.field}>
                <label htmlFor="confirmPassword" className={styles.label}>
                    Confirmer mot de passe
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    data-testid="confirm-password-input"
                    value={signUpData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>
            {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <Button
                variant="primary"
                className={styles.inscriptionBtn}
                type="submit"
                data-testid="register-submit-button"
            >
                Inscription
            </Button>
        </form>
    );
}

export default SignUpForm;
