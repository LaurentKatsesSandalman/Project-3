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

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
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
      <button type="button" onClick={() => removeField(field.id)}>Supprimer</button>
    </div>
  );
};

export default FormField;
