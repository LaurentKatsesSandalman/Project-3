import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './FormCreator.module.css';

// Interface pour définir la structure d'un champ de formulaire
interface FormField {
  id: string;
  type: string;
  label: string;
  options?: string[];
  required: boolean;
  scale?: number;
  starSize?: number; // Taille des étoiles pour les champs de notation
}

// Schéma de validation avec Yup
const formSchema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email est requis'),
  url: yup.string().url('URL invalide').required('URL est requis'),
  tel: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Numéro de téléphone invalide'),
});

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

// Composant pour gérer l'affichage et l'interaction avec les notes (étoiles ou cœurs)
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
              fontSize: `${starSize}px`, // Appliquer la taille des étoiles
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

const FormCreator = () => {
  // États pour gérer les propriétés du formulaire
  const [formTitle, setFormTitle] = useState('Nouveau Formulaire');
  const [formTitleFont, setFormTitleFont] = useState('Arial');
  const [formTitleSize, setFormTitleSize] = useState('24px');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [color, setColor] = useState('#4285F4');
  const [preview, setPreview] = useState(false);

  // Initialisation de useForm avec le schéma de validation Yup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema)
  });

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = data => {
    console.log(data);
  };

  // Fonction pour ajouter un nouveau champ au formulaire
  const addField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: `Nouvelle question`,
      required: false,
      options: type === 'radio' || type === 'checkbox' ? ['Option 1'] : undefined,
      scale: type === 'rating' ? 5 : undefined,
      starSize: type === 'rating' ? 24 : undefined, // Taille par défaut des étoiles
    };
    setFormFields([...formFields, newField]);
  };

  // Fonction pour supprimer un champ du formulaire
  const removeField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  // Fonction pour mettre à jour le libellé d'un champ
  const updateFieldLabel = (id, label) => {
    setFormFields(formFields.map(field => field.id === id ? { ...field, label } : field));
  };

  // Fonction pour mettre à jour l'échelle d'un champ de notation
  const updateFieldScale = (id, scale) => {
    setFormFields(formFields.map(field => field.id === id ? { ...field, scale } : field));
  };

  // Fonction pour mettre à jour la taille des étoiles d'un champ de notation
  const updateFieldStarSize = (id, starSize) => {
    setFormFields(formFields.map(field => field.id === id ? { ...field, starSize } : field));
  };

  // Fonction pour ajouter une option à un champ de type case à cocher ou bouton radio
  const addOptionToField = (id) => {
    setFormFields(formFields.map(field =>
      field.id === id ? {
        ...field,
        options: [...(field.options || []), `Option ${(field.options || []).length + 1}`]
      } : field
    ));
  };

  // Fonction pour mettre à jour une option d'un champ
  const updateOption = (fieldId, optionIndex, newValue) => {
    setFormFields(formFields.map(field => {
      if (field.id === fieldId && field.options) {
        const updatedOptions = [...field.options];
        updatedOptions[optionIndex] = newValue;
        return { ...field, options: updatedOptions };
      }
      return field;
    }));
  };

  // Fonction pour éclaircir une couleur hexadécimale
  const lighterColor = (hexColor, factor) => {
    const num = parseInt(hexColor.replace("#", ""), 16);
    const amt = Math.round(2.55 * factor);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
  };

  // Style pour le fond de la page
  const backgroundStyle = {
    backgroundColor: lighterColor(color, 80),
  };

  return (
    <div className={styles['form-creator']} style={backgroundStyle}>
      {!preview ? (
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
            <select value={formTitleFont} onChange={(e) => setFormTitleFont(e.target.value)}>
              {fonts.map((fontOption) => (
                <option key={fontOption} value={fontOption}>{fontOption}</option>
              ))}
            </select>
            <select value={formTitleSize} onChange={(e) => setFormTitleSize(e.target.value)}>
              {titleFontSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
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
            <label>
              Police:
              <select value={font} onChange={(e) => setFont(e.target.value)}>
                {fonts.map((fontOption) => (
                  <option key={fontOption} value={fontOption}>{fontOption}</option>
                ))}
              </select>
            </label>
            <label>
              Taille de texte:
              <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                {fontSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </label>
            <label>
              Couleur:
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </label>
          </div>

          <div className={styles['field-buttons']}>
            {fieldTypes.map((fieldType) => (
              <button key={fieldType.type} onClick={() => addField(fieldType.type)}>
                {fieldType.label}
              </button>
            ))}
          </div>

          <div className={styles['form-fields']}>
            {formFields.map((field) => (
              <div key={field.id} className={styles['form-field']}>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateFieldLabel(field.id, e.target.value)}
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
                          onChange={(e) => updateOption(field.id, index, e.target.value)}
                        />
                      </div>
                    ))}
                    <button onClick={() => addOptionToField(field.id)} style={{ marginTop: '5px' }}>Ajouter une option</button>
                  </div>
                ) : field.type === 'radio' ? (
                  <div style={{ marginBottom: '5px' }}>
                    {field.options?.map((option, index) => (
                      <div key={index} style={{ fontFamily: font, fontSize, color: lighterColor(color, 50) }}>
                        <input type="radio" name={field.id} value={option} {...register(field.id)} />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(field.id, index, e.target.value)}
                        />
                      </div>
                    ))}
                    <button onClick={() => addOptionToField(field.id)} style={{ marginTop: '5px' }}>Ajouter une option</button>
                  </div>
                ) : field.type === 'rating' ? (
                  <div>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={field.scale}
                      onChange={(e) => updateFieldScale(field.id, parseInt(e.target.value))}
                      style={{ marginBottom: '5px' }}
                    />
                    <input
                      type="number"
                      min="10"
                      max="50"
                      value={field.starSize}
                      onChange={(e) => updateFieldStarSize(field.id, parseInt(e.target.value))}
                      style={{ marginBottom: '5px' }}
                    />
                    <Rating scale={field.scale} character="★" starSize={field.starSize} />
                  </div>
                ) : (
                  <input type={field.type} {...register(field.id)} style={{ fontFamily: font, fontSize, color: lighterColor(color, 50), marginBottom: '5px' }} />
                )}
                {errors[field.id] && <p>{errors[field.id].message}</p>}
                <button onClick={() => removeField(field.id)} style={{ marginTop: '5px' }}>Supprimer</button>
              </div>
            ))}
          </div>

          <div className={styles['form-actions']}>
            <button type="submit">Sauvegarder formulaire</button>
            <button type="button" onClick={() => setPreview(!preview)}>
              {preview ? 'Retour à l\'édition' : 'Aperçu'}
            </button>
          </div>
        </form>
      ) : (
        <div className={styles['form-preview']}>
          <h1 style={{ fontFamily: formTitleFont, fontSize: formTitleSize, color }}>{formTitle}</h1>
          <p style={{ color }}>{formDescription}</p>
          {formFields.map((field) => (
            <div key={field.id} style={{ fontFamily: font, fontSize, marginBottom: '10px' }}>
              <p style={{ color }}>{field.label}</p>
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
