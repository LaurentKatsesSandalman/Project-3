import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../FormField/FormField';
import ColorSelector from '../ColorSelector/ColorSelector';
import Rating from '../Rating/Rating';
import FormPreview from '../FormPreview/FormPreview';
import styles from './FormCreator.module.css';

// Fonctions de validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateUrl = (url) => {
  const re = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return re.test(url);
};

const validateTel = (tel) => {
  const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return re.test(tel);
};

// Liste des polices et tailles disponibles
const fonts = [
  'Arial', 'Verdana', 'Times New Roman', 'Glycerin', 'Georgia',
  'Baskerville', 'Roboto', 'Open Sans', 'Lato', 'Ferryman', 'Raspberie 90s',
  'TT Travels NextFont', 'Brutalista', 'Marcovaldo', 'Fifty Fifty'
];

const fontSizes = [12, 14, 16, 18, 20, 24, 32, 36];
const titleFontSizes = [16, 18, 20, 24, 28, 32, 36, 40];

// Liste des types de champs disponibles
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
  { type: 'rating', name: 'Notation' },
];

const FormCreator = () => {
  const [formTitle, setFormTitle] = useState('Nouveau Formulaire');
  const [formTitleFont, setFormTitleFont] = useState('Arial');
  const [formTitleSize, setFormTitleSize] = useState('24px');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('#4285F4');
  const [preview, setPreview] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

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
      scale: type === 'rating' ? 5 : undefined,
      starSize: type === 'rating' ? 24 : undefined,
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

  const lighterColor = (hexColor, factor) => {
    const num = parseInt(hexColor.replace("#", ""), 16);
    const amt = Math.round(2.55 * factor);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
  };

  const backgroundStyle = {
    backgroundColor: lighterColor(color, 80),
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-actions']}>
        <button type="button" onClick={() => setPreview(!preview)}>Aperçu</button>
      </div>

      {!preview ? (
        <div className={styles['form-body']}>
          <div className={styles['form-reorganize-container']}>
            <h3>Réorganiser</h3>
            {formFields.map((field) => (
              <div key={field.id} className={styles['drag-item']}>
                {field.name}
              </div>
            ))}
          </div>

          <div style={backgroundStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles['form-header']}>
                <input
                  type="text"
                  placeholder="Titre du formulaire"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className={styles['form-title']}
                  style={{ fontFamily: formTitleFont, fontSize: formTitleSize, color }}
                />
                <input
                  type="text"
                  placeholder="Description du formulaire"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className={styles['form-description']}
                  style={{ color }}
                />
              </div>

              <div className={styles['form-styling-options']}>
                <div className={styles['font-and-size']}>
                  <label>
                    Police du titre:
                    <select value={formTitleFont} onChange={(e) => setFormTitleFont(e.target.value)}>
                      {fonts.map((fontOption) => (
                        <option key={fontOption} value={fontOption}>{fontOption}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Taille du titre:
                    <select value={formTitleSize} onChange={(e) => setFormTitleSize(e.target.value)}>
                      {titleFontSizes.map((size) => (
                        <option key={size} value={`${size}px`}>{`${size}px`}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={styles['font-and-size']}>
                  <label>
                    Police des questions:
                    <select value={font} onChange={(e) => setFont(e.target.value)}>
                      {fonts.map((fontOption) => (
                        <option key={fontOption} value={fontOption}>{fontOption}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Taille des questions:
                    <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                      {fontSizes.map((size) => (
                        <option key={size} value={`${size}px`}>{`${size}px`}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <ColorSelector color={color} setColor={setColor} />
              </div>

              <div className={styles['form-editor']}>
                {formFields.map((field) => (
                  <div key={field.id} className={styles['form-field']}>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                      style={{ fontFamily: font, fontSize, color, marginBottom: '5px' }}
                    />
                    <input
                      type="text"
                      placeholder="Description de la question"
                      value={field.description}
                      onChange={(e) => updateFieldDescription(field.id, e.target.value)}
                      style={{ fontFamily: font, fontSize, color, marginBottom: '5px' }}
                    />
                    {field.type === 'textarea' ? (
                      <textarea {...register(field.id)} style={{ fontFamily: font, fontSize, color: lighterColor(color, 50), marginBottom: '5px' }} />
                    ) : field.type === 'checkbox' ? (
                      <div style={{ marginBottom: '5px' }}>
                        {field.options?.map((option, index) => (
                          <div key={index} style={{ fontFamily: font, fontSize, color: lighterColor(color, 50) }}>
                            <input type="checkbox" id={`option-${field.id}-${index}`} {...register(`${field.id}.${index}`)} />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const updatedOptions = [...(field.options || [])];
                                updatedOptions[index] = e.target.value;
                                setFormFields(formFields.map(f => f.id === field.id ? { ...f, options: updatedOptions } : f));
                              }}
                            />
                          </div>
                        ))}
                        <button type="button" onClick={() => {
                          const updatedOptions = [...(field.options || []), `Option ${(field.options || []).length + 1}`];
                          setFormFields(formFields.map(f => f.id === field.id ? { ...f, options: updatedOptions } : f));
                        }}>Ajouter une option</button>
                      </div>
                    ) : field.type === 'radio' ? (
                      <div style={{ marginBottom: '5px' }}>
                        {field.options?.map((option, index) => (
                          <div key={index} style={{ fontFamily: font, fontSize, color: lighterColor(color, 50) }}>
                            <input type="radio" name={field.id} value={option} {...register(field.id)} />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const updatedOptions = [...(field.options || [])];
                                updatedOptions[index] = e.target.value;
                                setFormFields(formFields.map(f => f.id === field.id ? { ...f, options: updatedOptions } : f));
                              }}
                            />
                          </div>
                        ))}
                        <button type="button" onClick={() => {
                          const updatedOptions = [...(field.options || []), `Option ${(field.options || []).length + 1}`];
                          setFormFields(formFields.map(f => f.id === field.id ? { ...f, options: updatedOptions } : f));
                        }}>Ajouter une option</button>
                      </div>
                    ) : field.type === 'rating' ? (
                      <Rating scale={field.scale} character="★" starSize={field.starSize} />
                    ) : (
                      <input
                        type={field.type}
                        {...register(field.id, {
                          validate: {
                            emailValidation: (value) => field.type === 'email' ? validateEmail(value) || 'Email invalide' : true,
                            urlValidation: (value) => field.type === 'url' ? validateUrl(value) || 'URL invalide' : true,
                            telValidation: (value) => field.type === 'tel' ? validateTel(value) || 'Numéro de téléphone invalide' : true,
                          }
                        })}
                        style={{ fontFamily: font, fontSize, color: lighterColor(color, 50), marginBottom: '5px' }}
                      />
                    )}
                    {errors[field.id] && <p>{errors[field.id].message}</p>}
                    <button type="button" onClick={() => removeField(field.id)}>Supprimer</button>
                  </div>
                ))}
              </div>
            </form>
          </div>

          <div className={styles['form-right-panel']}>
            <button type="submit" className={styles['form-save-button']} onClick={handleSubmit(onSubmit)}>Sauvegarder formulaire</button>
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
      ) : (
        <FormPreview
          formTitle={formTitle}
          formDescription={formDescription}
          formFields={formFields}
          formTitleFont={formTitleFont}
          formTitleSize={formTitleSize}
          font={font}
          fontSize={fontSize}
          color={color}
          lighterColor={lighterColor}
          setPreview={setPreview}
        />
      )}
    </div>
  );
};

export default FormCreator;
