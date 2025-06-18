import { Link, useParams } from "react-router-dom";
import styles from "./AnswerForm.module.css";
import { useEffect, useState } from "react";
import type { SecuredForm } from "../../types/form";
import axios from "axios";
import logoUrl from "./../../assets/logos/Logo-Quicky.svg";
import Loading from "../../components/Loading/Loading";
import type { Field } from "../../types/fields";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import type { FieldAnswer } from "../../types/answers";
import { useAppContext } from "../../context/AppContext";

function AnswerForm() {
    const { authToken, setAuthToken } = useAppContext();
    const { form_id } = useParams();
    const [securedForm, setSecuredForm] = useState<SecuredForm | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<FieldAnswer[]>([]);

    const getSecuredForm = async (form_id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${
                    import.meta.env.VITE_QUICKY_API_URL
                }/api/forms/answerable/${form_id}`
            );

            setSecuredForm(response.data);
        } catch (err: any) {
            if (err.status === 403 || err.status === 404) {
                setErrorMessage(err.response.data.error);
            }
            setErrorMessage(
                "Oups ! Nous n'avons pas pu vous connecter au serveur."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (securedForm?.multi_answer) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_QUICKY_API_URL}/api/answers/${
                        securedForm?.form_id
                    }`,
                    {
                        answeredForm: answers,
                    }
                );
            } catch (err: any) {
                // When there is an issue with the token
                if (
                    err.response?.status === 401 ||
                    err.response?.status === 403
                ) {
                    setAuthToken(null);
                }
            }
        }
        // CHECK IF MULTIANSWER, if it is not, save form_id in local storage and stop the user
        // from sending his answers if he already has this form_id stored
        // SEND THE ANSWERS
        console.log("Answers sent");
    };

    useEffect(() => {
        if (!form_id) return;
        getSecuredForm(form_id);
    }, []);

    useEffect(() => {
        if (!securedForm) return;
        const baseAnswers = securedForm.fields.map((field) => {
            return {
                field_id: field.field_id,
                is_unique: field.is_unique,
                value: "",
            };
        });
        setAnswers(baseAnswers);
    }, [securedForm]);

    return (
        <div
            // Change the CSS variables to the selected theme
            style={
                {
                    "--font-base": `"${
                        securedForm?.theme.font1_value ?? "Chivo"
                    }", sans-serif`,
                    "--font-alt": `"${
                        securedForm?.theme.font2_value ?? "Spectral"
                    }", serif`,
                    "--font-text-size": `${
                        securedForm?.theme.font1_size ?? 16
                    }px`,
                    "--font-title-size": `${
                        securedForm?.theme.font2_size ?? 24
                    }px`,
                    "--font-big-title-size": `${
                        (securedForm?.theme.font2_size ?? 24) * 1.33
                    }px`,
                    "--color-primary": `hsl(${
                        securedForm?.theme.color_value ?? 169
                    }, 75%, 28%)`,
                    "--color-primary-darker": `hsl(${
                        securedForm?.theme.color_value ?? 169
                    }, 75%, 24%)`,
                    "--color-body-background": `hsl(${
                        securedForm?.theme.color_value ?? 169
                    }, 15%, 87%)`,
                    "--color-text-dark": `hsl(${
                        securedForm?.theme.color_value ?? 169
                    }, 75%, 4%)`,
                    "--color-text-placeholder": `hsl(${
                        securedForm?.theme.color_value ?? 169
                    }, 75%, 60%)`,
                } as React.CSSProperties
            }
            className={styles.pageContainer}
        >
            {
                // While the form is being requested
                loading ? (
                    <Loading />
                ) : // If there is an error
                errorMessage || !securedForm ? (
                    <>
                        <div className={styles.container}>
                            <h1 className={styles.errorMessage}>
                                {errorMessage}
                            </h1>
                        </div>
                    </>
                ) : (
                    // Show the form
                    <div className={styles.formContainer}>
                        <div className={styles.formInfos}>
                            <h1 className={styles.formTitle}>
                                {securedForm.form_name}
                            </h1>
                            <p className={styles.formDescription}>
                                {securedForm.form_description}
                            </p>
                        </div>
                        <form
                            className={styles.form}
                            onSubmit={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            {securedForm.fields.map((field: Field) => {
                                return (
                                    <InputField
                                        key={field.field_id}
                                        field={field}
                                        answer={answers.find((answer) => {
                                            return (
                                                answer.field_id ===
                                                field.field_id
                                            );
                                        })}
                                        setAnswers={setAnswers}
                                    />
                                );
                            })}
                            <Button
                                variant="primary"
                                type="submit"
                                className={styles.submitBtn}
                            >
                                Envoyer
                            </Button>
                        </form>
                    </div>
                )
            }
            <Link to="/" className={styles.link}>
                Réalisez vos formulaires facilement grâce à
                <img className={styles.logo} src={logoUrl} alt="Quicky logo" />
                <span className={styles.logoName}>Quicky</span>
            </Link>
        </div>
    );
}

export default AnswerForm;
