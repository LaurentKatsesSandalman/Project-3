import axios from "axios";
import { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import styles from "./FormCreator.module.css";
import type { FormPayload } from "../../types/form";
import { useAppContext } from "../../context/AppContext";
import type { FieldPayload } from "../../types/fields";
import { useParams } from "react-router-dom";

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

const fieldTypes:FieldType[] = [
  { type: "text", name: "Texte court", field_type_id: 1 },
  { type: "textarea", name: "Texte long", field_type_id: 11 },
  { type: "email", name: "Email", field_type_id: 4 },
  { type: "tel", name: "Téléphone", field_type_id: 8 },
  { type: "checkbox", name: "Case à cocher", field_type_id: 2 },
  { type: "radio", name: "Choix unique", field_type_id: 7 },
  { type: "date", name: "Date", field_type_id: 3 },
  { type: "time", name: "Heure", field_type_id: 10 },
  { type: "url", name: "URL", field_type_id: 9 },
{ type: "month", name: "Liste des mois", field_type_id:5},
  { type: "number", name: "Nombre", field_type_id: 6 },
  { type: "droplist", name: "Liste déroulante", field_type_id: 12 },
  //A voir:  { type: "notes", name: "Notation", field_type_id:13}
];

// à remplacer par un fetch, même pour new form, car le form n'est pas vraiment new (a déjà été créé vide)
const emptyForm = {
  is_deployed: false,
  is_closed: false,
  date_to_close: null,
  is_public: false,
  multi_answer: false,
  form_name: "Nouveau formulaire",
  form_description: "", //il faudra veiller à indiquer que form_description n'est plus optionnel
  theme: {
    theme_id:1,
    color_value: 169,
    font1_value: "Chivo",
    font2_value: "Spectral",
    font1_size: 16,
    font2_size: 24,
  },
  fields: [],
};



const FormCreator = () => {
  const { authToken, setAuthToken } = useAppContext();
  const [form, setForm] = useState<FormPayload>(emptyForm);
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const { form_id } = useParams<{ form_id: string }>();

  useEffect (() =>{
    const getForm = async()=>{
     try {
            const response = await axios.get(
                //`${import.meta.env.VITE_QUICKY_API_URL}/api/forms/1`, // 1 hardcoded, waiting for proper implem
                `${import.meta.env.VITE_QUICKY_API_URL}/api/forms/${form_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setForm(response.data);
        } catch (err: any) {
            // When there is an issue with the token
            if (err.response?.status === 403 || err.response?.status === 401) {
                setAuthToken(null);
            }
        }}
        getForm()

  },[])



   const togglePanelVisibility = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // <-- empêche le reset du formulaire
    console.log(form)
    try {
      //const formData =
      await axios.put(
        `${import.meta.env.VITE_QUICKY_API_URL}/api/forms/${form_id}`,
        {
          form:form
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (err: any) {
      // When there is an issue with the token
      if (err.response?.status === 403 || err.response?.status === 401) {
        setAuthToken(null);
      }
    }
  };

  const handleChange = (string: 'title'|'description', eventTargetValue: string)=>{
    if (string ==='title'){setForm((prev)=>({...prev, form_name:eventTargetValue }))}
    if (string ==='description'){setForm((prev)=>({...prev, form_description:eventTargetValue }))}
  }
  
  const addField = (type: TypeOfField) => {
    const newField = {
      field_ordering: (form.fields.length+1),
      field_name: `Nouvelle question`,
      is_required: false,
      is_unique: false,
      field_type_id:
        fieldTypes[fieldTypes.findIndex((fieldType) => fieldType.type === type)]
          .field_type_id,
      field_description: "",
      default_value: null,
      field_options: [],
    };
    setForm((prev) => ({ ...prev, fields: [...prev.fields, newField] }));
  };

 function findTypeName(field: FieldPayload): string {

  const index = fieldTypes.findIndex((fieldType) => fieldType.field_type_id === field.field_type_id)
  if (index === -1) {
    throw new Error('Field type not found');
  }

  return fieldTypes[index].name;
  }

  // const removeField = (field_ordering: number) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     fields: prev.fields.filter(
  //       (field) => field.field_ordering !== field_ordering
  //     ),
  //   }));
  // };

  // const updateFieldName = (field_ordering: number, field_name: string) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     fields: prev.fields.map((field, index) =>
  //       index === field_ordering - 1
  //         ? { ...field, field_name: field_name }
  //         : field
  //     ),
  //   }));
  // };

  // const updateFieldDescription = (
  //   field_ordering: number,
  //   field_description: string
  // ) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     fields: prev.fields.map((field, index) =>
  //       index === field_ordering - 1
  //         ? { ...field, field_description: field_description }
  //         : field
  //     ),
  //   }));
  // };

  // doit-on mettre fieldname et fielddesc dans field? sinon, il faut remonter fieldoptions ici !!

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-header"]}>
          <input
            type="text"
            placeholder="Titre du formulaire"
            value={form.form_name}
            onChange={(event) => {
    event.preventDefault();
    handleChange("title", event.target.value);
  }}
            className={styles["form-title"]}
          />
          <input
            type="text"
            placeholder="Description du formulaire"
            value={form.form_description}
            onChange={(event) => {
    event.preventDefault();
    handleChange("description", event.target.value);
  }}
            className={styles["form-description"]}
          />
        </div>

        <div className={styles["form-layout"]}>
          <div className={styles["form-editor"]}>
            {form.fields.map((field) => (
              <FormField
                key={field.field_ordering}
                field={field}
                fieldTypeName={findTypeName(field)}
                setForm={setForm}
              />
            ))}
            <button
            type="button"
            onClick={togglePanelVisibility}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ➕
          </button>
          </div>
{isPanelVisible && (
          <div className={styles["form-right-panel"]}>
            <button type="submit" className={styles["form-save-button"]}>
              Sauvegarder formulaire
            </button>
            <div className={styles["form-fields-container"]}>
              <h3>Choisir un champ</h3><button
            type="button"
            onClick={togglePanelVisibility}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ➕
          </button>
              {fieldTypes.map((fieldType) => (
                <button
                  key={fieldType.field_type_id}
                  type="button"
                  onClick={() => addField(fieldType.type)}
                >
                  {fieldType.name}
                </button>
              ))}
              
            </div>
          </div>)}
        </div>
      </form>
    </div>
  );
};

export default FormCreator;
