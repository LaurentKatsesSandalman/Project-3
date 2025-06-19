import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../FormField/FormField';
import FormPreview from '../FormPreview/FormPreview';
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
  const [isFieldsPanelVisible, setIsFieldsPanelVisible] = useState(true);
  const [viewMode, setViewMode] = useState('edit'); // 'edit', 'preview', or 'result'

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const addField = (type) => {
    const fieldType = fieldTypes.find((field) => field.type === type);
    const fieldTypeName = fieldType ? fieldType.name : 'Nouveau Champ';

    const newField = {
      id: Date.now().toString(),
      type,
      name: fieldTypeName,
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

  const toggleFieldsPanelVisibility = () => {
    setIsFieldsPanelVisible(!isFieldsPanelVisible);
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['mode-toggle-buttons']}>
        <button
          type="button"
          onClick={() => setViewMode('edit')}
          className={`${styles['mode-toggle-button']} ${viewMode === 'edit' ? styles['active'] : ''}`}
        >
          Éditer
        </button>
        <button
          type="button"
          onClick={() => setViewMode('preview')}
          className={`${styles['mode-toggle-button']} ${viewMode === 'preview' ? styles['active'] : ''}`}
        >
          Aperçu
        </button>
        <button
          type="button"
          onClick={() => setViewMode('result')}
          className={`${styles['mode-toggle-button']} ${viewMode === 'result' ? styles['active'] : ''}`}
        >
          Résultat
        </button>
      </div>

      {viewMode === 'preview' ? (
        <FormPreview
          formTitle={formTitle}
          formDescription={formDescription}
          formFields={formFields}
        />
      ) : viewMode === 'result' ? (
        <div className={styles['result-page']}>
          {/* Page blanche pour les résultats pour le moments a changer pour les vrai result*/}
        </div>
      ) : (
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
              <button type="submit" className={styles['form-save-button']}>
                Sauvegarder formulaire
              </button>
              <div style={{ position: 'relative' }}>
                {isFieldsPanelVisible && (
                  <div className={styles['form-fields-container']}>
                    <h3>Choisir un champ</h3>
                    {fieldTypes.map((fieldType) => (
                      <button key={fieldType.type} type="button" onClick={() => addField(fieldType.type)}>
                        {fieldType.name}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={toggleFieldsPanelVisibility}
                  className={styles['toggle-panel-button']}
                >
                  {isFieldsPanelVisible ? '➖' : '➕'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormCreator;
