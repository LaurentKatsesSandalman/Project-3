import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormField from '../FormField/FormField';
import ThemeCustom from '../ThemeCustom/ThemeCustom'; // Assurez-vous que le chemin est correct
import styles from './FormCreator.module.css';
import type { FormPayload } from '../../types/form';
import { useAppContext } from '../../context/AppContext';
import type { FieldPayload } from '../../types/fields';

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

const fieldTypes: FieldType[] = [
  { type: "text", name: "Texte court", field_type_id: 1 },
  { type: "textarea", name: "Texte long", field_type_id: 11 },
  { type: "email", name: "Email", field_type_id: 4 },
  { type: "tel", name: "Téléphone", field_type_id: 8 },
  { type: "checkbox", name: "Case à cocher", field_type_id: 2 },
  { type: "radio", name: "Choix unique", field_type_id: 7 },
  { type: "date", name: "Date", field_type_id: 3 },
  { type: "time", name: "Heure", field_type_id: 10 },
  { type: "url", name: "URL", field_type_id: 9 },
  { type: "month", name: "Liste des mois", field_type_id: 5 },
  { type: "number", name: "Nombre", field_type_id: 6 },
  { type: "droplist", name: "Liste déroulante", field_type_id: 12 },
];

const emptyForm = {
  is_deployed: false,
  is_closed: false,
  date_to_close: null,
  is_public: false,
  multi_answer: false,
  form_name: "Nouveau formulaire",
  form_description: "",
  theme: {
    theme_id: 1,
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
  const [isFieldsPanelVisible, setIsFieldsPanelVisible] = useState(true);

  const { form_id } = useParams<{ form_id: string }>();

  useEffect(() => {
    const getForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_QUICKY_API_URL}/api/forms/${form_id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setForm(response.data);
      } catch (err: any) {
        if (err.response?.status === 403 || err.response?.status === 401) {
          setAuthToken(null);
        }
      }
    };
    getForm();
  }, [authToken, form_id, setAuthToken]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    try {
      await axios.put(
        `${import.meta.env.VITE_QUICKY_API_URL}/api/forms/${form_id}`,
        { form },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (err: any) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        setAuthToken(null);
      }
    }
  };

  const handleThemeChange = (newTheme: any) => {
    setForm(prevForm => ({
      ...prevForm,
      theme: newTheme
    }));
  };

  const handleChange = (string: "title" | "description", eventTargetValue: string) => {
    if (string === "title") {
      setForm((prev) => ({ ...prev, form_name: eventTargetValue }));
    }
    if (string === "description") {
      setForm((prev) => ({ ...prev, form_description: eventTargetValue }));
    }
  };

  const addField = (type: TypeOfField) => {
    const newField = {
      field_ordering: form.fields.length + 1,
      field_name: `Nouvelle question`,
      is_required: false,
      is_unique: false,
      field_type_id: fieldTypes[fieldTypes.findIndex((fieldType) => fieldType.type === type)].field_type_id,
      field_description: "",
      default_value: null,
      field_options: [],
    };
    setForm((prev) => ({ ...prev, fields: [...prev.fields, newField] }));
  };

  const findTypeName = (field: FieldPayload): string => {
    const index = fieldTypes.findIndex((fieldType) => fieldType.field_type_id === field.field_type_id);
    if (index === -1) {
      throw new Error("Field type not found");
    }
    return fieldTypes[index].name;
  };

  const toggleFieldsPanelVisibility = () => {
    setIsFieldsPanelVisible(!isFieldsPanelVisible);
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit}>
        <ThemeCustom onThemeChange={handleThemeChange} />

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
          </div>
          <div className={styles["form-right-panel"]}>
            <button type="submit" className={styles["form-save-button"]}>
              Sauvegarder formulaire
            </button>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={toggleFieldsPanelVisibility}
                className={styles["toggle-panel-button"]}
              >
                {isFieldsPanelVisible ? "➖" : "➕"}
              </button>
              {isFieldsPanelVisible && (
                <div className={styles["form-fields-container"]}>
                  <h3>Choisir un champ</h3>
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
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreator;
