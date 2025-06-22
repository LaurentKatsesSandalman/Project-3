import { useState } from "react";
import type { OptionResult, Result } from "../../types/answers";
import styles from "./ResultField.module.css";
import Button from "../Button/Button";

interface ResultFieldProps {
    field_name: string;
    field_type_id: number;
    results: Result[];
    options_results: OptionResult[];
}

function ResultField({
    field_name,
    field_type_id,
    results,
    options_results,
}: ResultFieldProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Used to get the highest voted value
    const getMaxCount = (array: OptionResult[]): number => {
        let highestCount = 0;
        for (const item of array) {
            if (item.count > highestCount) {
                highestCount = item.count;
            }
        }
        return highestCount;
    };

    const maxCount = getMaxCount(options_results);
    return (
        <div className={styles.fieldContainer}>
            <div className={styles.fieldInfo}>
                <h2 className={styles.fieldName}>{field_name}</h2>
                <p className={styles.totalResult}>{results.length} réponses</p>
            </div>
            <Button
                variant="secondary"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? "Cacher" : "Afficher"}
            </Button>
            {isOpen &&
                (results.length > 0 ? (
                    // Check if the field_type is aggregable
                    ![2, 7, 12].includes(field_type_id) ? (
                        <table className={styles.table}>
                            <tbody>
                                {results.map((result) => (
                                    <tr key={result.field_answer_id}>
                                        <td className={styles.tableCell}>
                                            {result.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={styles.graphContainer}>
                            {options_results.map((option_result) => (
                                <div
                                    key={option_result.value}
                                    className={styles.rowContainer}
                                >
                                    <div className={styles.barInfo}>
                                        <p className={styles.votes}>
                                            {option_result.count}
                                        </p>
                                        <p>-</p>
                                        <p className={styles.value}>
                                            {option_result.value}
                                        </p>
                                    </div>
                                    <div className={styles.barContainer}>
                                        <div
                                            className={styles.bar}
                                            // Calculate the bar's width
                                            style={{
                                                width: `${
                                                    (option_result.count /
                                                        maxCount) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <p style={{ marginTop: "16px" }}>
                        Pas de réponses pour le moment
                    </p>
                ))}
        </div>
    );
}

export default ResultField;
