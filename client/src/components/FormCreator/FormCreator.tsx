import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './FormCreator.module.css';

// Interface pour définir la structure d'un champ de formulaire
interface FormField {
  id: string;
  type: string;
  label: string;
  description: string;
  options?: string[];
  required: boolean;
  scale?: number;
  starSize?: number;
}

// Fonction de validation personnalisée pour remplacer Yup
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

// Liste des polices disponibles pour le texte
const fonts = [
  'Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia',
  'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS'
];

// Liste des tailles de police disponibles pour le texte
const fontSizes = [
  '12px', '14px', '16px', '18px', '20px', '24px', '32px', '36px'
];

// Liste des tailles de police disponibles pour le titre
const titleFontSizes = [
  '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px'
];

// Liste des types de champs disponibles avec leurs libellés
const fieldTypes = [
  { type: 'text', label: 'Texte court' },
  { type: 'textarea', label: 'Texte long' },
  { type: 'email', label: 'Email' },
  { type: 'tel', label: 'Téléphone' },
  { type: 'checkbox', label: 'Case à cocher' },
  { type: 'radio', label: 'Choix unique' },
  { type: 'date', label: 'Date' },
  { type: 'time', label: 'Heure' },
  { type: 'url', label: 'URL' },
  { type: 'rating', label: 'Notation' },
];

// Composant pour afficher et gérer les notations en étoiles
const Rating = ({ scale = 5, character = '★', starSize = 24 }) => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(scale)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            style={{
              cursor: 'pointer',
              color: starValue <= rating ? 'gold' : 'gray',
              fontSize: `${starSize}px`,
            }}
            onClick={() => setRating(starValue)}
          >
            {character}
          </span>
        );
      })}
    </div>
  );
};

// Composant principal pour créer et personnaliser des formulaires
const FormCreator = () => {
  const [formTitle, setFormTitle] = useState('Nouveau Formulaire');
  const [formTitleFont, setFormTitleFont] = useState('Arial');
  const [formTitleSize, setFormTitleSize] = useState('24px');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('#4285F4');
  const [preview, setPreview] = useState(false);

  // Initialisation du formulaire avec react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = (data) => {
    console.log(data);
  };

  // Ajoute un nouveau champ au formulaire
  const addField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: `Nouvelle question`,
      description: '',
      required: false,
      options: type === 'checkbox' || type === 'radio' ? ['Option 1'] : undefined,
      scale: type === 'rating' ? 5 : undefined,
      starSize: type === 'rating' ? 24 : undefined,
    };
    setFormFields([...formFields, newField]);
  };

  // Supprime un champ du formulaire
  const removeField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  // Met à jour le libellé d'un champ
  const updateFieldLabel = (id, label) => {
    setFormFields(formFields.map(field => field.id === id ? { ...field, label } : field));
  };

  // Met à jour la description d'un champ
  const updateFieldDescription = (id, description) => {
    setFormFields(formFields.map(field => field.id === id ? { ...field, description } : field));
  };

  // Fonction pour créer une couleur plus claire
  const lighterColor = (hexColor, factor) => {
    const num = parseInt(hexColor.replace("#", ""), 16);
    const amt = Math.round(2.55 * factor);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
  };

  // Style pour le fond du formulaire
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
                {field.label}
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
                        <option key={size} value={size}>{size}</option>
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
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  Couleur:
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
              </div>

              <div className={styles['form-editor']}>
                {formFields.map((field) => (
                  <div key={field.id} className={styles['form-field']}>
                    <input
                      type="text"
                      value={field.label}
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
                  {fieldType.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['form-preview']} style={backgroundStyle}>
          <h1 style={{ fontFamily: formTitleFont, fontSize: formTitleSize, color }}>{formTitle}</h1>
          <p style={{ color }}>{formDescription}</p>
          {formFields.map((field) => (
            <div key={field.id} style={{ fontFamily: font, fontSize, marginBottom: '10px' }}>
              <p style={{ color }}>{field.label}</p>
              <p style={{ color: lighterColor(color, 50), fontSize: '14px' }}>{field.description}</p>
              {field.type === 'textarea' ? (
                <textarea style={{ fontFamily: font, fontSize, color: lighterColor(color, 50) }} />
              ) : field.type === 'checkbox' ? (
                field.options?.map((option, index) => (
                  <div key={index} style={{ color: lighterColor(color, 50) }}>
                    <input type="checkbox" id={`preview-option-${field.id}-${index}`} />
                    <label htmlFor={`preview-option-${field.id}-${index}`}>{option}</label>
                  </div>
                ))
              ) : field.type === 'radio' ? (
                field.options?.map((option, index) => (
                  <div key={index} style={{ color: lighterColor(color, 50) }}>
                    <input type="radio" name={`preview-radio-group-${field.id}`} id={`preview-radio-${field.id}-${index}`} />
                    <label htmlFor={`preview-radio-${field.id}-${index}`}>{option}</label>
                  </div>
                ))
              ) : field.type === 'rating' ? (
                <Rating scale={field.scale} character="★" starSize={field.starSize} />
              ) : (
                <input type={field.type} style={{ fontFamily: font, fontSize, color: lighterColor(color, 50) }} />
              )}
            </div>
          ))}
          <button onClick={() => setPreview(!preview)}>Retour à l'édition</button>
        </div>
      )}
    </div>
  );
};

export default FormCreator;
