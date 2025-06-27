import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import logoUrl from "./../../assets/logos/Logo-Quicky.svg";

function Home() {
    // choppage de value entre pas connecté /je veux me connecter / je veux m'inscrire
    const {
        isSignUpActive,
        setIsSignUpActive,
        isLoginActive,
        setIsLoginActive,
        navigate,
        authToken,
    } = useAppContext();

    // If I try to go to the home page when I am already connected, get sent back to the forms page
    useEffect(() => {
        if (authToken) {
            navigate(`/forms`);
        }
    }, [authToken]);

    return (
        <>
            {isSignUpActive && (
                <Modal setActiveModal={setIsSignUpActive}>
                    <SignUpForm setActiveModal={setIsSignUpActive} />
                </Modal>
            )}
            {isLoginActive && (
                <Modal setActiveModal={setIsLoginActive}>
                    <LoginForm setActiveModal={setIsLoginActive} />
                </Modal>
            )}
            <div className={styles.page}>
                <div className={styles.welcomeContainer}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Quicky</h1>
                        <div className={styles.texts}>
                            <p className={styles.text}>
                                Avec{" "}
                                <span className={styles.accentuate}>
                                    Quicky
                                </span>
                                , concevez vos formulaires en quelques clics,
                                choisissez un thème, partagez-les par lien ou
                                intégrez-les sur votre site.
                            </p>
                            <p className={styles.text}>
                                <span className={styles.accentuate}>
                                    Rapide
                                </span>
                                ,{" "}
                                <span className={styles.accentuate}>
                                    élégant
                                </span>
                                ,{" "}
                                <span className={styles.accentuate}>
                                    sans prise de tête
                                </span>
                                .
                            </p>
                        </div>
                        <Button
                            className={styles.button}
                            variant="primary"
                            onClick={() => setIsSignUpActive(true)}
                        >
                            Créer un formulaire
                        </Button>
                    </div>
                    <img
                        className={styles.logo}
                        src={logoUrl}
                        alt="Quicky logo"
                    />
                </div>
                <div className={styles.examplesContainer}>
                    <div className={styles.example}>
                        <Button
                            className={styles.exampleBtn}
                            variant="secondary"
                            onClick={() => navigate("/answers/4")}
                        >
                            Exemple
                        </Button>
                        <div style={{ backgroundColor: "hsl(30, 15%, 87%)" }}>
                            <div style={{ padding: "30px" }}></div>
                            <img
                                style={{ display: "block", margin: "0 auto" }}
                                src=".\src\assets\form1.png"
                                alt="Exemple form"
                            />
                        </div>
                    </div>
                    <div className={styles.example}>
                        <Button
                            className={styles.exampleBtn}
                            variant="secondary"
                            onClick={() => navigate("/answers/3")}
                        >
                            Exemple
                        </Button>
                        <div style={{ backgroundColor: "hsl(300, 15%, 87%)" }}>
                            <div style={{ padding: "23px" }}></div>
                            <img
                                style={{ display: "block", margin: "0 auto" }}
                                src=".\src\assets\form2.png"
                                alt="Exemple form"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
