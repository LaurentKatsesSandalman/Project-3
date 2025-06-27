import clsx from "clsx";
import styles from "./InputField.module.css";
import type { Field } from "../../types/fields";
import type { FieldAnswer } from "../../types/answers";
import { useEffect, useState } from "react";

interface InputFieldProps {
    field: Field;
    answersOfField?: FieldAnswer[];
    setAnswers: React.Dispatch<React.SetStateAction<FieldAnswer[]>>;
    isNotUnique: boolean;
    setNotUniqueFieldAnswerId: React.Dispatch<
        React.SetStateAction<number | undefined>
    >;
}

function InputField({
    field,
    answersOfField, //remplacé par answersOfField
    setAnswers,
    isNotUnique,
    setNotUniqueFieldAnswerId,
}: InputFieldProps) {
    if (!answersOfField||answersOfField.length===0) return null;
    let inputElement: React.ReactNode;


//     // Ne sera pas gardé
//     //------
//     const answersOfFieldstemp = [
//         {field_id: field.field_id,
//     value: "chat",
//     is_unique: false
// },
//         {field_id: field.field_id,
//     value: "chien",
//     is_unique: false},
//         {field_id: field.field_id,
//     value: "rat",
//     is_unique: false}
//     ]
//     const [answersOfField, setAnswersOfField]= useState<FieldAnswer[]>(answersOfFieldstemp)
//     //------

    const [existingValues, setExistingValues] = useState <string[]>([])

    useEffect (()=>{

    setExistingValues((answersOfField.map((answer)=>(answer.value))))       
console.log(existingValues)
    },[answersOfField])

    // Change the value of the field is the ids match
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setAnswers((prev) =>
            prev.map((ans) =>
                ans.field_id === field.field_id
                    ? { ...ans, value: e.target.value }
                    : ans
            )
        );
        if (isNotUnique) {
            setNotUniqueFieldAnswerId(undefined);
        }
    };

    const handleChangeCheck = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        if(existingValues.includes(e.target.value))
        {setAnswers((prev) =>
            prev.filter((ans) =>
                !(ans.field_id === field.field_id && ans.value === e.target.value)))
        }
        else
        {setAnswers((prev) => ([...prev, {field_id: field.field_id,
    value: e.target.value,
    is_unique: field.is_unique
}]))}  
       
        if (isNotUnique) {
            setNotUniqueFieldAnswerId(undefined);
        }
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
                    placeholder="Texte..."
                    onChange={handleChange}
                    value={answersOfField[0].value}
                />
            );
            break;
        case 2: // Checkbox
            inputElement = field.field_options.map((option) => (
                <div
                    className={styles.optionContainer}
                    key={option.option_value}
                >
                    <input
                        className={styles.radio}
                        type="checkbox"
                        required={field.is_required ? true : false}
                        name={option.field_id.toString()}
                        value={option.option_value}
                        checked={existingValues.includes(option.option_value)}
                        onChange={handleChangeCheck}
                    />
                    <label className={styles.label}>{option.option_name}</label>
                </div>
                ));
            break;
        case 3: // Date
            inputElement = (
                <input
                    className={clsx(styles.input, styles.date)}
                    type="date"
                    required={field.is_required ? true : false}
                    onChange={handleChange}
                    value={answersOfField[0].value}
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
                    placeholder="johndoe@gmail.com..."
                    onChange={handleChange}
                    value={answersOfField[0].value}
                />
            );
            break;
        // case 5: // Month
        //     inputElement = <div>month</div>;
        //     break;
        case 6: // Number
            inputElement = (
                <input
                    className={clsx(styles.input, styles.number)}
                    type="number"
                    required={field.is_required ? true : false}
                    placeholder="42"
                    onChange={handleChange}
                    value={answersOfField[0].value}
                />
            );
            break;
        case 7: // Radio
            inputElement = field.field_options.map((option) => (
                <div
                    className={styles.optionContainer}
                    key={option.option_value}
                >
                    <input
                        className={styles.radio}
                        type="radio"
                        required={field.is_required ? true : false}
                        name={option.field_id.toString()}
                        value={option.option_value}
                        checked={option.option_value === answersOfField[0].value}
                        onChange={handleChange}
                    />
                    <label className={styles.label}>{option.option_name}</label>
                </div>
            ));
            break;
        case 8: // Phone number
            inputElement = (
                <input
                    className={clsx(styles.input, styles.phone)}
                    type="tel"
                    required={field.is_required ? true : false}
                    placeholder="0612345678..."
                    onChange={handleChange}
                    value={answersOfField[0].value}
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
                    placeholder="https://exemple.com..."
                    onChange={handleChange}
                    value={answersOfField[0].value}
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
                    value={answersOfField[0].value}
                />
            );
            break;
        case 11: // Textarea
            inputElement = (
                <textarea
                    className={clsx(styles.input, styles.textarea)}
                    maxLength={2000}
                    required={field.is_required ? true : false}
                    placeholder="Texte..."
                    onChange={handleChange}
                    value={answersOfField[0].value}
                />
            );
            break;
        case 12: // Droplist
            inputElement = (
                <select
                    className={styles.input}
                    required={field.is_required ? true : false}
                    value={answersOfField[0].value}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Sélectionner une option...
                    </option>
                    {field.field_options.map((option) => (
                        <option
                            className={styles.input}
                            key={option.option_value}
                            value={option.option_value}
                        >
                            {option.option_name}
                        </option>
                    ))}
                </select>
            );
            break;
        // case 13: // Grade
        //     inputElement = <div>notes</div>;
        //     break;
        default:
            inputElement = <div>Type de champ non existant</div>;
    }

    return (
        <div
            className={clsx(
                styles.fieldContainer,
                isNotUnique && styles.notUnique
            )}
        >
            <h2 className={styles.name}>
                {field.field_name} {field.is_required && <span>*</span>}{" "}
                {isNotUnique && (
                    <span className={styles.notUnique}>Doit être unique</span>
                )}
            </h2>
            {field.field_description && (
                <p className={styles.description}>{field.field_description}</p>
            )}
            <div className={styles.inputContainer}>{inputElement}</div>
        </div>
    );
}

export default InputField;
