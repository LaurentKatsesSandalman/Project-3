import styles from '../FormCreator/FormCreator.module.css';

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

const FormField = ({ field, register, removeField, updateFieldLabel, updateFieldDescription, setFormFields }) => {
  const updateOption = (fieldId, index, newValue) => {
    setFormFields(prevFields =>
      prevFields.map(field => {
        if (field.id === fieldId) {
          const updatedOptions = [...field.options];
          updatedOptions[index] = newValue;
          return { ...field, options: updatedOptions };
        }
        return field;
      })
    );
  };

  const removeOption = (fieldId, index) => {
    setFormFields(prevFields =>
      prevFields.map(field => {
        if (field.id === fieldId) {
          const updatedOptions = [...field.options];
          updatedOptions.splice(index, 1);
          return { ...field, options: updatedOptions };
        }
        return field;
      })
    );
  };

  const fieldType = fieldTypes.find((f) => f.type === field.type);
  const fieldTypeName = fieldType ? fieldType.name : 'Type Inconnu';

  return (
    <div className={styles['form-field']}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {fieldTypeName}
      </div>
      <input
        type="text"
        placeholder="Nom du champ"
        value={field.name}
        onChange={(e) => updateFieldLabel(field.id, e.target.value)}
        style={{ marginBottom: '5px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        placeholder="Description de la question"
        value={field.description}
        onChange={(e) => updateFieldDescription(field.id, e.target.value)}
        style={{ marginBottom: '5px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      {field.type === 'checkbox' && (
        <div style={{ marginBottom: '5px' }}>
          {field.options?.map((option, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <input type="checkbox" id={`option-${field.id}-${index}`} {...register(`${field.id}.${index}`)} />
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(field.id, index, e.target.value)}
                style={{ marginLeft: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button
                type="button"
                onClick={() => removeOption(field.id, index)}
                style={{ marginLeft: '10px' }}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updatedOptions = [...(field.options || []), `Option ${(field.options || []).length + 1}`];
              setFormFields(prevFields => prevFields.map(f => f.id === field.id ? { ...f, options: updatedOptions } : f));
            }}
          >
            Ajouter une option
          </button>
        </div>
      )}
      {field.type === 'radio' && (
        <div style={{ marginBottom: '5px' }}>
          {field.options?.map((option, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <input type="radio" name={field.id} value={option} {...register(field.id)} />
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(field.id, index, e.target.value)}
                style={{ marginLeft: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button
                type="button"
                onClick={() => removeOption(field.id, index)}
                style={{ marginLeft: '10px' }}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updatedOptions = [...(field.options || []), `Option ${(field.options || []).length + 1}`];
              setFormFields(prevFields => prevFields.map(f => f.id === field.id ? { ...f, options: updatedOptions } : f));
            }}
          >
            Ajouter une option
          </button>
        </div>
      )}
      <button type="button" onClick={() => removeField(field.id)} style={{ marginTop: '10px' }}>
        Supprimer le champ
      </button>
    </div>
  );
};

export default FormField;
