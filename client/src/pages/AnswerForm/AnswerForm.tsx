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

function AnswerForm() {
    const { form_id } = useParams();
    const [securedForm, setSecuredForm] = useState<SecuredForm | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getSecuredForm = async (form_id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:3000/api/forms/answerable/${form_id}`
            );

            setSecuredForm(response.data);
        } catch (err: any) {
            if (err.status === 403 || err.status === 404) {
                setErrorMessage(err.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // SEND THE ANSWERS
        console.log("Answers sent");
    };

    useEffect(() => {
        if (!form_id) return;
        getSecuredForm(form_id);
    }, []);

    useEffect(() => {
        console.log(securedForm);
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
                    "--color-text-accent": `hsl(${
                        securedForm?.theme.color_value ?? 169
                    }, 75%, 28%)`,
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
                    <>
                        <div className={styles.formInfos}>
                            <h1 className={styles.formTitle}>
                                {securedForm.form_name}
                            </h1>
                            <p className={styles.formDescription}>
                                {securedForm.form_description}
                            </p>
                        </div>
                        <form
                            onSubmit={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            {securedForm.fields.map((field: Field) => {
                                return (
                                    <InputField
                                        key={field.field_id}
                                        field={field}
                                    />
                                );
                            })}
                            <Button variant="primary" type="submit">
                                Envoyer
                            </Button>
                        </form>
                    </>
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
