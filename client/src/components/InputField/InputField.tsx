import styles from "./InputField.module.css";
import type { Field } from "../../types/fields";

interface InputFieldProps {
    field: Field;
}

function InputField({ field }: InputFieldProps) {
    return <div className={styles.fieldContainer}>Input FIELD</div>;
}

export default InputField;
