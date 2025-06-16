import { useParams } from "react-router-dom";
import styles from "./CreatorPage.module.css";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";


function CreatorPage() {
	const params = useParams();
    const [users, setUsers] = useState<any[]>();
	const [forms, setForms] = useState([]);
	const { authToken, setAuthToken } = useAppContext();
    const handleClick = async () => {
        // COPY THIS WHEN YOU WANT TO REQUEST THE API
        try {
            const response = await axios.get(
                `http://localhost:3000/api/users`,
                // WHERE YOU WOULD WANT TO ADD THE REQUEST BODY
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setUsers(response.data);
        } catch (err: any) {
            // TEMP
            console.log(err);
            // When there is an issue with the token
            if (err.reponse?.status === 401 || err.response?.status === 403) {
                // Maybe do something to show the user he is being disconnected
                setAuthToken(null);
            }
        }
    };

    useEffect(() => {
        console.log(users);
    }, [users]);
    // END OF TEMP
	useEffect(() => {
		const user_id = params.user_id;
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
	}, [params.user_id]);
	return (
		<>
			<section className="Header_section">
				<div className="H1_contener">
					<h1>Vos formulaires</h1>
				</div>			
			</section>
			<section className="button_section">
				<div className="contener_button">
					<Button variant="primary" onClick={() => window.location.href = `/create-form/${params.user_id}`}>
						Créer un nouveau formulaire
					</Button>
				</div>
			</section>
			{/* <div>User id: {user_id}</div> */}
			{/*bouton pour creer nouveau formulaire*/}

				{/* <div className={styles.formList}>
				{forms.map((form) => (
					<div key={form.id} className={styles.formItem}>
						<h2>{form.title}</h2>
						<Button variant="secondary" onClick={() => window.location.href = `/form/${form.id}`}>
							Gérer le formulaire
						</Button>
					</div>
				))}	
			</div>			 */}
			{/*map la liste des formulaires
    

    // TEMP, used as an exemple
    

    return (
        <>
            <h1>Creator page</h1>
            <Button variant="danger" onClick={handleClick}>
                TEST
            </Button>
            {/*map la liste des formulaires
			=> pour chacun, le petit recap avec bouton pour aller plus loin
			*/}	
		</>
	);
}

export default CreatorPage;
