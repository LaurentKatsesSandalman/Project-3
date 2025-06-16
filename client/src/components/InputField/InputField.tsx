import clsx from "clsx";
import styles from "./InputField.module.css";
import type { Field } from "../../types/fields";
import type { Answer } from "../../types/answers";

interface InputFieldProps {
    field: Field;
    answer?: Answer;
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

function InputField({ field, answer, setAnswers }: InputFieldProps) {
    if (!answer) return null;
    let inputElement: React.ReactNode;

    console.log(answer);
    // Change the value of the field is the ids match
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAnswers((prev) =>
            prev.map((ans) =>
                ans.field_id === field.field_id
                    ? { ...ans, value: e.target.value }
                    : ans
            )
        );
    };

    // Look for the field_type to display the correct input
    switch (field.field_type_id) {
        case 1: // Text
            inputElement = (
                <input
                    className={styles.input}
                    type="text"
                    maxLength={255}
                    required={field.is_required ? true : false}
                    placeholder={answer.default_value}
                    onChange={handleChange}
                    value={answer.value}
                />
            );
            break;
        case 2: // Checkbox
            inputElement = <div>checkbox</div>;
            break;
        case 3: // Date
            inputElement = (
                <input
                    className={clsx(styles.input, styles.date)}
                    type="date"
                    required={field.is_required ? true : false}
                    onChange={handleChange}
                    value={answer.value}
                />
            );
            break;
        case 4: // Email
            inputElement = (
                <input
                    className={styles.input}
                    type="email"
                    maxLength={255}
                    required={field.is_required ? true : false}
                    placeholder={answer.default_value}
                    onChange={handleChange}
                    value={answer.value}
                />
            );
            break;
        case 5: // Month
            inputElement = <div>month</div>;
            break;
        case 6: // Number
            inputElement = (
                <input
                    className={clsx(styles.input, styles.number)}
                    type="number"
                    required={field.is_required ? true : false}
                    onChange={handleChange}
                    value={answer.value}
                />
            );
            break;
        case 7: // Radio
            inputElement = <div>radio</div>;
            break;
        case 8: // Phone number
            inputElement = (
                <input
                    className={clsx(styles.input, styles.phone)}
                    type="tel"
                    required={field.is_required ? true : false}
                    placeholder="0612345678"
                    onChange={handleChange}
                    value={answer.value}
                    pattern="0[1-9][0-9]{8}"
                />
            );
            break;
        case 9: // Url
            inputElement = (
                <input
                    className={styles.input}
                    type="url"
                    maxLength={255}
                    required={field.is_required ? true : false}
                    placeholder={answer.default_value}
                    onChange={handleChange}
                    value={answer.value}
                />
            );
            break;
        case 10: // Time
            inputElement = (
                <input
                    className={clsx(styles.input, styles.time)}
                    type="time"
                    required={field.is_required ? true : false}
                    onChange={handleChange}
                    value={answer.value}
                />
            );
            break;
        case 11: // Textarea
            inputElement = (
                <textarea
                    className={clsx(styles.input, styles.textarea)}
                    maxLength={255}
                    required={field.is_required ? true : false}
                    placeholder={answer.default_value}
                    onChange={handleChange}
                    value={answer.value}
                />
            );
            break;
        case 12: // Droplist
            inputElement = <div>droplist</div>;
            break;
        case 13: // Grade
            inputElement = <div>notes</div>;
            break;
        default:
            inputElement = <div>Type de champ non existant</div>;
    }

    return (
        <div className={styles.fieldContainer}>
            <h2 className={styles.name}>
                {field.field_name} {field.is_required && <span>*</span>}
            </h2>
            {field.field_description && (
                <p className={styles.description}>{field.field_description}</p>
            )}
            <div className={styles.inputContainer}>{inputElement}</div>
        </div>
    );
}

export default InputField;
