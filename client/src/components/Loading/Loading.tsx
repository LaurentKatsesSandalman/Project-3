import { LoadingIcon } from "../Icons/Icons";
import styles from "./Loading.module.css";

function Loading() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Chargement</h1>
            <LoadingIcon className={styles.loadingIcon} />
        </div>
    );
}

export default Loading;
