import { useAppContext } from "../../context/AppContext";
import Modal from "../../components/Modal/Modal";
import styles from "./Home.module.css";

function Home() {
	// choppage de value entre pas connecté /je veux me connecter / je veux m'inscrire
	const { isSignUpActive, setIsSignUpActive } = useAppContext();

	return (
		<>
			<h1>Homepage</h1>
			{isSignUpActive && <Modal setActiveModal={setIsSignUpActive}>TEST</Modal>}
			{/* morceau commun (background avec exemples) */}
			{/*switch case
			pas connecté :  rien
			en connexion : popup connexion
			en inscription: pop-up inscription
			*/}
		</>
	);
}

export default Home;
