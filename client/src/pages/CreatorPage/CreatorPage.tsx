import { useParams } from "react-router-dom";
import styles from "./CreatorPage.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { getUsers } from "../../api/requests/users";

// choppe :user_id de l'url
// fetch les formulaire pour user_id = xx

function CreatorPage() {
	const params = useParams();

	const { authToken, setAuthToken } = useAppContext();

	const handleClick = async () => {
		// TEMP, used for practice
		try {
			// console.log(getUsers)
			// const response = await getUsers({authToken: authToken});
			const response = await axios.get(
				"http://localhost:3000/api/users/",
				// WHERE I WOULD WANT TO ADD MY REQUEST BODY
				{
					headers: {
        				'Authorization': `Bearer ${authToken}`
    				}
				}
			);
			console.log(response.data)
		} catch(err) {
			console.log(err.response.data.error);
			if(err.status === 403 || err.status === 401) {
				setAuthToken(null);
			}
		}
	}

	return (
		<>
			<h1>Creator page</h1>
			<div>User id: {params.user_id}</div>
			<Button variant="danger" onClick={handleClick}>TEST</Button>
			{/*map la liste des formulaires
			=> pour chacun, le petit recap avec bouton pour aller plus loin
			*/}
			{/*bouton pour creer nouveau formulaire*/}
		</>
	);
}

export default CreatorPage;
