import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import type { Form, FormItem } from "../../types/form";
import styles from "../CreatorPage/CreatorPage.module.css";
import Item from "../../components/Item/item"

function CreatorPage() {
    const [forms, setForms] = useState<Form[] | []>([]);
    const { authToken, setAuthToken } = useAppContext();
    const navigate = useNavigate();
    const handleClick = async () => {
        const emptyForm = {
            is_public: true,
            is_deployed: true,
            is_closed: false,
            multi_answer: false,
            form_name: "Nouveau formulaire",
            form_description: "",
            theme_id: 1,
        };
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_QUICKY_API_URL}/api/forms`,
                emptyForm,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            navigate(`/forms/${response.data.form_id}`); //redirection vers la page du formulaire crée
        } catch (err: any) {
            console.error(
                "Une erreur s'est produite lors de la création du formulaire :",
                err
            );

            if (err.response?.status === 401 || err.response?.status === 403) {
                setAuthToken(null);
            }
            alert(
                "Impossible de créer un formulaire pour le moment, veuillez réessayer plus tard."
            );
        }
    };

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_QUICKY_API_URL}/api/forms`,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );
                setForms(response.data);
            } catch (err) {
                console.error("Error fetching forms:", err);
            }
        };

        fetchForms();
    }, []);
    useEffect(() => {
        console.log(forms);
    }, [forms]);
    return (
        <>
            <section className={styles.headerSection}>
                <div className={styles.h1Container}>
                    <h1>Vos formulaires</h1>
                </div>
            </section>
            <section className={styles.buttonSection}>
                <div className={styles.containerButton}>
                    <Button variant="create_form" onClick={handleClick}>
                        Créer un nouveau formulaire
                    </Button>
                </div>
            </section>
            <section className={styles.formListSection}>               
				{forms.map((form) => (
					<Item 
						key={form.form_id}
                        form={form}
						onPublish={() => console.log(`Publish form with id: ${form.form_id}`)}
					onClose={() => console.log(`Close form with id: ${form.form_id}`)}
					onDelete={() => console.log(`Delete form with id: ${form.form_id}`)}
					/>
			))}
			</section>
        </>
    );
}

export default CreatorPage;
