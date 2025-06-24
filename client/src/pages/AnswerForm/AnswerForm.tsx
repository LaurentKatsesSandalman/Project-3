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
import clsx from "clsx";
import { BackIcon } from "../../components/Icons/Icons";

interface AnswerFormProps {
    isPreview: boolean;
}

function AnswerForm({ isPreview }: AnswerFormProps) {
    const { setAuthToken } = useAppContext();
    const { form_id } = useParams();
    const [securedForm, setSecuredForm] = useState<SecuredForm | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<FieldAnswer[]>([]);
    const [notUniqueFieldAnswerId, setNotUniqueFieldAnswerId] =
        useState<number>();
    const [success, setSuccess] = useState<boolean>(false);

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
                return;
            }
            setErrorMessage(
                "Oups ! Nous n'avons pas pu vous connecter au serveur."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!securedForm) return;

        if (
            // If a user can answer only once
            !securedForm.multi_answer &&
            // Check if form_id already exist in localStorage
            isAlreadyAnswered(securedForm.form_id)
        ) {
            alert("Vous avez déjà répondu à ce formulaire.");
            return;
        }
        try {
            // Post the answers to the backend
            await axios.post(
                `${import.meta.env.VITE_QUICKY_API_URL}/api/answers/${
                    securedForm.form_id
                }`,
                {
                    form_id: securedForm.form_id,
                    form_answers: answers,
                }
            );
            // Add the form_id to the localStorage if everything went fine
            addAnsweredForm(securedForm.form_id);
            setSuccess(true);
        } catch (err: any) {
            // When there is an issue with the token
            if (err.response?.status === 401 || err.response?.status === 403) {
                setAuthToken(null);
                return;
            }
            if (err.response?.status === 409) {
                setNotUniqueFieldAnswerId(err.response.data.notUniqueFieldId);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            console.error("Erreur lors du fetch:", err);
        }
    };

    const isAlreadyAnswered = (id: number) => {
        // Get the existing forms already answered
        const answeredForms = JSON.parse(
            localStorage.getItem("answeredForms") ?? "[]"
        );

        // Return true if the form_id is in the localStorage
        return answeredForms.includes(id);
    };

    const addAnsweredForm = (id: number) => {
        const answeredForms = JSON.parse(
            localStorage.getItem("answeredForms") ?? "[]"
        );

        // Add this new answered form Id if it doesnt already exist
        if (!answeredForms.includes(id)) {
            answeredForms.push(id);
        }

        localStorage.setItem("answeredForms", JSON.stringify(answeredForms));
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
            className={clsx(
                styles.pageContainer,
                isPreview && styles.previewSpacing
            )}
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
                ) : // If the form answers were added successfully
                success ? (
                    <div className={styles.container}>
                        <h1 className={styles.successMessage}>
                            Votre formulaire à bien été envoyé
                        </h1>
                    </div>
                ) : (
                    <div className={styles.formContainer}>
                        <div className={styles.formInfos}>
                            <div className={styles.previewContainer}>
                                {isPreview && (
                                    <Link to="/forms">
                                        <BackIcon className={styles.backIcon} />
                                    </Link>
                                )}
                                <h1 className={styles.formTitle}>
                                    {securedForm.form_name}
                                </h1>
                            </div>
                            <p className={styles.formDescription}>
                                {securedForm.form_description}
                            </p>
                        </div>
                        <form
                            className={styles.form}
                            onSubmit={(e) => {
                                e.preventDefault();
                                isPreview
                                    ? alert(
                                          "Vous ne pouvez pas répondre à votre formulaire en mode Aperçu"
                                      )
                                    : handleSubmit();
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
                                        // When form answers are sent and a field is not unique this becomes true
                                        isNotUnique={
                                            field.field_id ===
                                            notUniqueFieldAnswerId
                                        }
                                        setNotUniqueFieldAnswerId={
                                            setNotUniqueFieldAnswerId
                                        }
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
            {!isPreview && (
                <Link to="/" className={styles.link}>
                    Réalisez vos formulaires facilement grâce à
                    <img
                        className={styles.logo}
                        src={logoUrl}
                        alt="Quicky logo"
                    />
                    <span className={styles.logoName}>Quicky</span>
                </Link>
            )}
        </div>
    );
}

export default AnswerForm;
