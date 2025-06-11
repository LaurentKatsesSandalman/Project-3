import styles from "./CreatorPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";


function CreatorPage() {
	const {user_id} = useParams(); 
	const [forms, setForms] = useState([]);
	useEffect(() => {
		const fetchForms = async () => {
			try {
				const response = await fetch(`/api/creator/${user_id}/forms`);
				if (!response.ok) {
					throw new Error('Failed to fetch forms');
				}
				const data = await response.json();
				setForms(data);
			} catch (error) {
				console.error('Error fetching forms:', error);
			}
		};

		fetchForms();
	}, [user_id]);
	return (
		<>
			<h1>Vos formulaires</h1>
			{/*bouton pour creer nouveau formulaire*/}
			<Button variant="primary" onClick={()=>window.location.href = `/create-form/${user_id}`}>
				Créer un nouveau formulaire
			</Button>
			{/*map la liste des formulaires
			=> pour chacun, le petit recap avec bouton pour aller plus loin
			*/}
			<div className={styles.formList}>
				{forms.map((form) => (
					<div key={form.id} className={styles.formItem}>
						<h2>{form.title}</h2>
						<Button variant="secondary" onClick={() => window.location.href = `/form/${form.id}`}>
							Gérer le formulaire
						</Button>
					</div>
				))}	
			</div>				
		</>
	);
}

export default CreatorPage;
