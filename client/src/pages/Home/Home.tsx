import { useAppContext } from "../../context/AppContext";
import Modal from "../../components/Modal/Modal";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Home.module.css";

function Home() {
    // choppage de value entre pas connecté /je veux me connecter / je veux m'inscrire
    const {
        isSignUpActive,
        setIsSignUpActive,
        isLoginActive,
        setIsLoginActive,
    } = useAppContext();

    return (
        <>
            <h1>Homepage</h1>
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
