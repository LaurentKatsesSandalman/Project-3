const FormField = ({ field, register, removeField }) => {
  return (
    <div className={styles['form-field']}>
      <input
        type="text"
        defaultValue={field.name}
        {...register(field.id)}
      />
      {field.type === 'textarea' ? (
        <textarea {...register(field.id)} />
      ) : (
        <input type={field.type} {...register(field.id)} />
      )}
      <button type="button" onClick={() => removeField(field.id)}>Supprimer</button>
    </div>
  );
};

export default FormField;
