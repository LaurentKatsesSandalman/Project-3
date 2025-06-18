import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { Form } from "../../types/form";
// import Item from "../../components/Item/item";


function CreatorPage() {
	const params = useParams();
    const [users, setUsers] = useState<any[]>();
	const [forms, setForms] = useState<Form[] | []>([]);
	const { authToken, setAuthToken } = useAppContext();
    const handleClick = async () => {
        // COPY THIS WHEN YOU WANT TO REQUEST THE API
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_QUICKY_API_URL}/api/users`, // You could add /${form_id} to the route for example if you want to pass params to your request
                // WHERE YOU WOULD WANT TO ADD THE REQUEST BODY if .post or .patch
                // {
                //     form: formData,
                // },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setUsers(response.data);
        } catch (err: any) {
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
		const fetchForms = async () => {
			try {
				const response = await fetch(`/api/forms`, {
      				method: 'GET',
					headers: {
						'Authorization': `Bearer ${authToken}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({})
					});
				if (!response.ok) {
					throw new Error('Failed to fetch forms');
				}
				const data = await response.json();
				setForms(data);
			} catch (error) {
				console.error('Error fetching forms:', error);
				alert("Impossible de créer un formulaire pour le moment, veuillez réessayer plus tard.");
			}
		};

		fetchForms();
	}, []);
	return (
		<>
			<section className="Header_section">
				<div className="H1_contener">
					<h1>Vos formulaires</h1>
				</div>			
			</section>
			<section className="button_section">
				<div className="contener_button">
					<Button variant="create_form" onClick={handleClick}>
						Créer un nouveau formulaire
					</Button>
				</div>
			</section>
			{/* <section className="form_list_section">
				{forms.map((form) => (
					<Item 
						key={form.form_id}
						form={form}
						onPublish={() => console.log(`Publish form with id: ${form.form_id}`)}
					onClose={() => console.log(`Close form with id: ${form.form_id}`)}
					onDelete={() => console.log(`Delete form with id: ${form.form_id}`)}
					/>
			))}
			</section> */}
		</>
	);
}

export default CreatorPage;
