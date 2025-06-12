import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
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
        userId,
        navigate,
    } = useAppContext();

    // If I try to go to the home page when I am already connected, get sent back to the forms page
    useEffect(() => {
        if (userId) {
            navigate(`/${userId}`);
        }
    }, [userId]);

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
        </>
    );
}

export default Home;
