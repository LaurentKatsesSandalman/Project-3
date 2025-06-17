import type { FieldPayload } from "../../types/fields";
import type { FormPayload } from "../../types/form";


interface FieldProps{
  field: FieldPayload;
  setForm: React.Dispatch<React.SetStateAction<FormPayload>>;
}

const FormField = ({ field, setForm }:FieldProps) => {
  
    const removeField = () => {
      const orderValue=field.field_ordering
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter(
        (fieldlambda) => fieldlambda.field_ordering !== field.field_ordering
      ),
    }));
    setForm((prev)=> ({
      ...prev,
      fields: prev.fields.map((fieldlambda) =>
        fieldlambda.field_ordering > orderValue
          ? { ...fieldlambda, field_ordering: fieldlambda.field_ordering -1 }
          : fieldlambda
      ),
    }))
  };

  const updateFieldName = (field_name: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((fieldlambda, index) =>
        index === field.field_ordering - 1
          ? { ...fieldlambda, field_name: field_name }
          : fieldlambda
      ),
    }));
  };

  const updateFieldDescription = (
    field_description: string
  ) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((fieldlambda, index) =>
        index === field.field_ordering - 1
          ? { ...fieldlambda, field_description: field_description }
          : fieldlambda
      ),
    }));
  };
  
  const updateOption = (option_ordering:number, newValue:string) => {
    setForm((prev)=>({
      ...prev,
      fields:prev.fields.map((fieldlambda, index) =>
        index === field.field_ordering - 1
          ? { ...fieldlambda, field_options:fieldlambda.field_options.map((option, optionindex) =>
         optionindex === option_ordering -1
        ? {...option, option_name:newValue, option_value:newValue} : option ) 
            
           }
          : fieldlambda)
    }))
  };

   const addOption = () => {
    const newOption = {
      option_ordering:(field.field_options.length+1),
      option_name:"",
      option_value:"",
    }

     setForm((prev)=>({
      ...prev,
      fields:prev.fields.map((fieldlambda, index) =>
        index === field.field_ordering - 1
          ? { ...fieldlambda, field_options:[...fieldlambda.field_options,newOption] 
            
           }
          : fieldlambda)
    }))
  };

  const removeOption = ()=> {}

  return (
    <div className={styles['form-field']}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {fieldTypeName}
      </div>
      <input
        type="text"
        placeholder="Question"
        value={field.field_name}
        onChange={(e) => updateFieldName(e.target.value)}
        style={{ marginBottom: '5px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="text"
        placeholder="Description de la question"
        value={field.field_description}
        onChange={(e) => updateFieldDescription(e.target.value)}
        style={{ marginBottom: '5px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      {(field.field_type_id === 2||field.field_type_id === 7||field.field_type_id === 12) && (
        <div style={{ marginBottom: '5px' }}>
          {field.field_options?.map((option) => (
            <div key={option.option_ordering} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <input
                type="text"
                value={option.option_value}
                onChange={(e) => updateOption(option.option_ordering, e.target.value)}
                style={{ marginLeft: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button
                type="button"
                onClick={() => removeOption(field.id, index)}Add commentMore actions
                style={{ marginLeft: '10px' }}
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
          >
            Ajouter une option
          </button>
        </div>
      )}
      <button type="button" onClick={removeField}>Supprimer cette question</button>
    </div>
  );
};

export default FormField;
