import { useParams } from "react-router-dom";
import styles from "./CreatorPage.module.css";

// choppe :user_id de l'url
// fetch les formulaire pour user_id = xx

function CreatorPage() {
	const params = useParams();

	return (
		<>
			<h1>Creator page</h1>
			<div>User id: {params.user_id}</div>
			{/*map la liste des formulaires
			=> pour chacun, le petit recap avec bouton pour aller plus loin
			*/}
			{/*bouton pour creer nouveau formulaire*/}
		</>
	);
}

export default CreatorPage;
