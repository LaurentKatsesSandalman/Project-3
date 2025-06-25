import logoUrl from "./../../assets/logos/Logo-Quicky.svg";
import Button from "../../components/Button/Button";
import styles from "./Page404.module.css";
import { useNavigate } from "react-router-dom";

function Page404() {
	const navigate = useNavigate();

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<div className={styles.logoContainer}>
					<img
						className={styles.logo}
						src={logoUrl}
						alt="Quicky logo"
					/>
					<p className={styles.brand}>Quicky</p>
				</div>
				<div className={styles.content}>
					<div>
						<h1 className={styles.title}>Erreur 404</h1>
						<p>La page que vous avez demandée n'existe pas</p>
					</div>
					<Button
						className={styles.button}
						variant="primary"
						onClick={() => navigate("/")}
					>
						Retour à l'acceuil
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Page404;
