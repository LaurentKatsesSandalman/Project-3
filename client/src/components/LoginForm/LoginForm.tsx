import axios, { AxiosError } from "axios";
import { useState } from "react";
import type { AppContextType } from "../../context/AppContext";
import Button from "../Button/Button";
import styles from "./LoginForm.module.css";

type LoginData = {
    email: string;
    password: string;
};

type ResultData = {
    accessToken: string;
};

interface LoginFormProps {
    setActiveModal: AppContextType["setIsLoginActive"];
}

function LoginForm({ setActiveModal }: LoginFormProps) {
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });

    const [resultData, setResultData] = useState<ResultData | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = loginData;
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/users/login",
                { email: email, password: password }
            );
            setResultData(response.data);
            setActiveModal(false);
            console.log(response.data);
        } catch (err) {
            // TO DO, backend error handling and display using status code
            console.log(err.response.data.error);
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
