import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Button from "../Button/Button";
import styles from "./TopBar.module.css";
import logoUrl from "./../../assets/logos/Logo-Quicky.svg";

function TopBar() {
	const { setIsSignUpActive } = useAppContext();
	const [isConnected, setIsConnected] = useState(false);
	return (
		<div className={styles.navbar}>
			<div className={styles.logoContainer}>
				<img className={styles.logo} src={logoUrl} alt="Quicky logo" />
				<p className={styles.logoName}>Quicky</p>
			</div>
			{isConnected ? (
				<p>Connected</p>
				/* Boutons Avatar et Deconnexion quand on est connecté */
			) : (
				<div className={styles.buttonsContainer}>
					<Button variant="Secondary" onClick={() => setIsSignUpActive(true)}>
						Inscription
					</Button>
					{/* Ajouter bouton connexion */}
				</div>
			)}
		</div>
	);
}

export default TopBar;
