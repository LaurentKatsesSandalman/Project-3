import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import logoUrl from "./../../assets/logos/Logo-Quicky.svg";
import { AvatarIcon } from "../Icons/Icons";
import styles from "./TopBar.module.css";

function TopBar() {
	const { authToken, setAuthToken, setIsSignUpActive, setIsLoginActive } =
		useAppContext();

	return (
		<div className={styles.navbar}>
			<div className={styles.logoContainer}>
				<img className={styles.logo} src={logoUrl} alt="Quicky logo" />
				<p className={styles.logoName}>Quicky</p>
			</div>
			{authToken !== null ? (
				<div className={styles.buttonsContainer}>
					{/* Go to the account settings of the user */}
					<Link to={`/settings`} className={styles.link}>
						<AvatarIcon className={styles.avatarIcon} />
					</Link>
					<Button variant="primary" onClick={() => setAuthToken(null)}>
						Deconnexion
					</Button>
				</div>
			) : (
				<div className={styles.buttonsContainer}>
					<Button data-testid="register-openmodal-button" variant="secondary" onClick={() => setIsSignUpActive(true)}>
						Inscription
					</Button>
					<Button data-testid="login-openmodal-button" variant="primary" onClick={() => setIsLoginActive(true)}>
						Connexion
					</Button>
				</div>
			)}
		</div>
	);
}

export default TopBar;
