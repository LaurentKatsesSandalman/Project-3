import styles from './FormPreview.module.css';

const FormPreview = ({ formTitle, formDescription, formFields }) => {
  return (
    <div className={styles['form-preview-container']}>
      <div className={styles['form-preview-header']}>
        <h1>{formTitle}</h1>
        <p>{formDescription}</p>
      </div>
      <div className={styles['form-preview-layout']}>
        {formFields.map((field) => (
          <div key={field.id} className={styles['form-preview-field']}>
            <label>{field.name}</label>
            {field.description && <p>{field.description}</p>}
            <input type={field.type} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
