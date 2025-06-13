import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext, type AppContextType } from "../../context/AppContext";
import Button from "../Button/Button";
import styles from "./LoginForm.module.css";
import type { User, UserLogin } from "../../types/users";

interface LoginFormProps {
    setActiveModal: AppContextType["setIsLoginActive"];
}

function LoginForm({ setActiveModal }: LoginFormProps) {
    const { setAuthToken, navigate } = useAppContext();
    const [loginData, setLoginData] = useState<UserLogin>({
        email: "",
        password: "",
    });
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => {
            return { ...prev, [name]: value };
        });
        setErrorMessage("");
    };

    // On submit, post the information to the backend to see if there is a corresponding user, if there is, return the token and id of the user
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = loginData;
        e.preventDefault();

        if (password.length < 8) {
            setErrorMessage("Mot de passe de 8 caractères minimum");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_QUICKY_API_URL}/api/users/login`,
                { email: email, password: password }
            );
            setUser(response.data);
        } catch (err: any) {
            setErrorMessage(err.response.data.error);
        }
    };

    useEffect(() => {
        if (user) {
            // used for permissions
            setAuthToken(user.accessToken);
            // close the modal
            setActiveModal(false);
            // go to the creator page
            navigate(`/forms`);
        }
    }, [user]);

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={loginData.email}
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
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <p className={styles.expectedInput}>8 caractères minimum</p>
            </div>
            {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <Button
                variant="primary"
                className={styles.inscriptionBtn}
                type="submit"
            >
                Connexion
            </Button>
        </form>
    );
}

export default LoginForm;
