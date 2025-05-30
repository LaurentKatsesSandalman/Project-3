import type { AppContextType } from "../../context/AppContext";
import { CloseIcon } from "../Icons/Icons";
import styles from "./Modal.module.css";

interface ModalProps {
    children: React.ReactNode;
    setActiveModal: AppContextType["setIsSignUpActive"];
}

function Modal({ children, setActiveModal }: ModalProps) {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                {children}
                <button
                    className={styles.closeBtn}
                    onClick={() => setActiveModal(false)}
                    type="button"
                >
                    <CloseIcon className={styles.closeIcon} />
                </button>
            </div>
        </div>
    );
}

export default Modal;
