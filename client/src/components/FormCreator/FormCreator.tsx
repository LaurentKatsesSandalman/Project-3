import { useState } from "react";
//import { useForm } from "react-hook-form";
import FormField from "../FormField/FormField";
import styles from "./FormCreator.module.css";
import type { FormPayload } from "../../types/form";

type TypeOfField =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "url"
  | "month"
  | "number"
  | "droplist"
  | "notes";

interface FieldType {
  type: TypeOfField;
  name: string;
  field_type_id: number;
}

const fieldTypes = [
  { type: "text", name: "Texte court", field_type_id: 1 },
  { type: "textarea", name: "Texte long", field_type_id: 11 },
  { type: "email", name: "Email", field_type_id: 4 },
  { type: "tel", name: "Téléphone", field_type_id: 8 },
  { type: "checkbox", name: "Case à cocher", field_type_id: 2 },
  { type: "radio", name: "Choix unique", field_type_id: 7 },
  { type: "date", name: "Date", field_type_id: 3 },
  { type: "time", name: "Heure", field_type_id: 10 },
  { type: "url", name: "URL", field_type_id: 9 },
  //Pas utilisé pour l'instant car pas pertinent: { type: "month", name: "Liste des mois", field_type_id:5},
  { type: "number", name: "Nombre", field_type_id: 6 },
  { type: "droplist", name: "Liste déroulante", field_type_id: 12 },
  //A voir:  { type: "notes", name: "Notation", field_type_id:13}
];

const emptyForm = {
  is_deployed: false,
  is_closed: false,
  date_to_close: null,
  is_public: false,
  multi_answer: false,
  form_name: "Nouveau formulaire",
  form_description: null,
  theme: {
    color_value: 169,
    font1_value: "Chivo",
    font2_value: "Spectral",
    font1_size: 16,
    font2_size: 24,
  },
  fields: [],
};

const FormCreator = () => {
  const [form, setForm] = useState<FormPayload>(emptyForm);

  // const [formTitle, setFormTitle] = useState('Nouveau Formulaire');
  // const [formDescription, setFormDescription] = useState('');
  // const [formFields, setFormFields] = useState([]);

 // je ne comprends pas ce que ça fait, j'essaie sans: const { register, handleSubmit } = useForm();

const handleSubmit=async()=>{
  
 } 
//  const onSubmit = (data) => {
//     // fetch?
//     console.log(data);
//   };

  const addField = (type: TypeOfField) => {
    const newField = {
      field_ordering: 999, //trouver comment avoir l'ordering,
      field_name: `Nouvelle question`,
      is_required: false,
      is_unique: false,
      field_type_id:
        fieldTypes[fieldTypes.findIndex((fieldType) => fieldType.type === type)]
          .field_type_id,
      field_description: null,
      default_value: null,
      field_options: [],
    };
    setForm((prev) => ({ ...prev, fields: [...prev.fields, newField] }));
  };

  const removeField = (field_ordering: number) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter(
        (field) => field.field_ordering !== field_ordering
      ),
    }));
  };

  const updateFieldName = (field_ordering: number, field_name: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field, index) =>
        index === field_ordering - 1
          ? { ...field, field_name: field_name }
          : field
      ),
    }));
  };

  const updateFieldDescription = (
    field_ordering: number,
    field_description: string
  ) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field, index) =>
        index === field_ordering - 1
          ? { ...field, field_description: field_description }
          : field
      ),
    }));
  };

// doit-on mettre fieldname et fielddesc dans field? sinon, il faut remonter fieldoptions ici !!

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-header"]}>
          <input
            type="text"
            placeholder="Titre du formulaire"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className={styles["form-title"]}
          />
          <input
            type="text"
            placeholder="Description du formulaire"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className={styles["form-description"]}
          />
        </div>

        <div className={styles["form-layout"]}>
          <div className={styles["form-editor"]}>
            {formFields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                register={register}
                removeField={removeField}
                updateFieldLabel={updateFieldLabel}
                updateFieldDescription={updateFieldDescription}
                setFormFields={setFormFields}
              />
            ))}
          </div>

          <div className={styles["form-right-panel"]}>
            <button type="submit" className={styles["form-save-button"]}>
              Sauvegarder formulaire
            </button>
            <div className={styles["form-fields-container"]}>
              <h3>Choisir un champ</h3>
              {fieldTypes.map((fieldType) => (
                <button
                  key={fieldType.type}
                  type="button"
                  onClick={() => addField(fieldType.type)}
                >
                  {fieldType.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreator;
