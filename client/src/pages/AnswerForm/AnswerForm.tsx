import { useParams } from "react-router-dom";
import styles from "./AnswerForm.module.css";
import { useEffect, useState } from "react";
import type { SecuredForm } from "../../types/form";
import axios from "axios";

function AnswerForm() {
    const { form_id } = useParams();
    const [securedForm, setSecuredForm] = useState<SecuredForm | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>(
        "404 - Formulaire n'existe pas"
    );

    const getSecuredForm = async (form_id: string) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/forms/answerable/${form_id}`
            );

            setSecuredForm(response.data);
        } catch (err: any) {
            if (err.status === 403 || err.status === 404) {
                setErrorMessage(err.response.data.error);
            }
        }
    };

    useEffect(() => {
        if (!form_id) return;
        getSecuredForm(form_id);
    }, []);

    useEffect(() => {
        console.log(securedForm);
    }, [securedForm]);

    return errorMessage || !securedForm ? (
        <div>{errorMessage}</div>
    ) : (
        <h1>Formulaire à répondre {securedForm.form_name}</h1>
    );
}

export default AnswerForm;
