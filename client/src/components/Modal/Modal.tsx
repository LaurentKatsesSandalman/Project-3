import type { AppContextType } from "../../context/AppContext";
import { ReactComponent as CloseIcon } from "../../assets/icons/Icon-Close.svg";
import styles from "./Modal.module.css";

interface ModalProps {
	children: React.ReactNode;
	setActiveModal: AppContextType["setIsSignUpActive"];
}

function Modal({ children, setActiveModal }: ModalProps) {
	return (
		<div className={styles.modalContainer}>
			<div className={styles.modal}>
				FORM POUR S'INSCRIRE
				<button
					className={styles.closeBtn}
					onClick={() => setActiveModal(false)}
					type="button"
				>
					<img className={styles.closeIcon} src={closeIcon} alt="Close Icon" />
				</button>
			</div>
		</div>
	);
}

export default Modal;
