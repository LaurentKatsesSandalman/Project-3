const FormPreview = ({ formFields }) => {
  return (
    <div className={styles['form-preview']}>
      {formFields.map((field) => (
        <div key={field.id}>
          <p>{field.name}</p>
          {field.type === 'textarea' ? (
            <textarea />
          ) : (
            <input type={field.type} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormPreview;
