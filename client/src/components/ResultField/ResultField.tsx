import type { Result } from "../../types/answers";
import styles from "./ResultField.module.css";

interface ResultFieldProps {
    field_name: string;
    results: Result[];
}

function ResultField({ field_name, results }: ResultFieldProps) {
    return (
        <div className={styles.fieldContainer}>
            <div className={styles.fieldInfo}>
                <h2 className={styles.fieldName}>{field_name}</h2>
                <p className={styles.totalResult}>{results.length} réponses</p>
            </div>
        </div>
    );
}

export default ResultField;
