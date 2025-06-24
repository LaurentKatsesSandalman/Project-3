import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FormResultType } from "../../types/form";
import axios from "axios";
import styles from "./FormResult.module.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import ResultField from "../ResultField/ResultField";
import { BackIcon } from "../Icons/Icons";

function FormResult() {
    const { authToken, setAuthToken } = useAppContext();
    const { form_id } = useParams();
    const [formResult, setFormResult] = useState<FormResultType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getFormResult = async (form_id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_QUICKY_API_URL}/api/answers/${form_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setFormResult(response.data);
        } catch (err: any) {
            if (err.status === 403 || err.status === 404) {
                setAuthToken(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!form_id) return;
        getFormResult(form_id);
    }, []);

    return (
        <div className={styles.pageContainer}>
            {
                // While the form is being requested
                loading ? (
                    <Loading />
                ) : (
                    formResult && (
                        <div className={styles.formResult}>
                            <div className={styles.titleContainer}>
                                <Link to="/forms">
                                    <BackIcon className={styles.backIcon} />
                                </Link>
                                <h1 className={styles.title}>
                                    {formResult.form_name}
                                </h1>
                            </div>
                            <div className={styles.container}>
                                <ul className={styles.generalInfos}>
                                    <li className={styles.generalInfo}>
                                        Nombre de réponses:
                                        <span className={styles.accentuate}>
                                            {formResult.total_answers}
                                        </span>
                                    </li>
                                    <li className={styles.generalInfo}>
                                        Date de création:
                                        <span className={styles.accentuate}>
                                            {formatDate(
                                                formResult.creation_date
                                            )}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            {formResult.field_results.map((field_result) => (
                                <ResultField
                                    key={field_result.field_id}
                                    field_name={field_result.field_name}
                                    field_type_id={field_result.field_type_id}
                                    results={field_result.results}
                                    options_results={
                                        field_result.options_results
                                    }
                                />
                            ))}
                        </div>
                    )
                )
            }
        </div>
    );
}

export default FormResult;
