import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../FormField/FormField';
import styles from './FormCreator.module.css';

const fieldTypes = [
  { type: 'text', name: 'Texte court' },
  { type: 'textarea', name: 'Texte long' },
  { type: 'email', name: 'Email' },
  { type: 'tel', name: 'Téléphone' },
  { type: 'checkbox', name: 'Case à cocher' },
  { type: 'radio', name: 'Choix unique' },
  { type: 'date', name: 'Date' },
  { type: 'time', name: 'Heure' },
  { type: 'url', name: 'URL' },
];

const FormCreator = () => {
  const [formTitle, setFormTitle] = useState('Nouveau Formulaire');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const addField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      name: `Nouvelle question`,
      description: '',
      required: false,
      options: type === 'checkbox' || type === 'radio' ? ['Option 1'] : undefined,
    };
    setFormFields([...formFields, newField]);
  };

  const removeField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const updateFieldLabel = (id, name) => {
    setFormFields(formFields.map(field => field.id === id ? { ...field, name } : field));
  };

  const updateFieldDescription = (id, description) => {
    setFormFields(formFields.map(field => field.id === id ? { ...field, description } : field));
  };

  return (
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['form-header']}>
          <input
            type="text"
            placeholder="Titre du formulaire"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className={styles['form-title']}
          />
          <input
            type="text"
            placeholder="Description du formulaire"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className={styles['form-description']}
          />
        </div>

        <div className={styles['form-layout']}>
          <div className={styles['form-editor']}>
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

          <div className={styles['form-right-panel']}>
            <button type="submit" className={styles['form-save-button']}>Sauvegarder formulaire</button>
            <div className={styles['form-fields-container']}>
              <h3>Choisir un champ</h3>
              {fieldTypes.map((fieldType) => (
                <button key={fieldType.type} type="button" onClick={() => addField(fieldType.type)}>
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
