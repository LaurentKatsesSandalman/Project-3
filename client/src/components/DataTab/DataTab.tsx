import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import type { Field } from "../../types/field"
import DataField from "../DataField/DataField"
import type { Form } from "../../types/form"


function DataTab() {

    const { form_id } = useParams<{ form_id: string }>()
    // il faudra peut-être "remonter" fieldList/formContent dans Page DetailedForm pour ne pas fetcher
    // deux fois les mêmes infos dans DataTab et FormCreator
    // MAJ 13 juin : Jordan travaille sur un gros objet qui sera le modèle pour tout, et dans lequel tout est contenu (form, fields, options)
    const [fieldList, setFieldList] = useState<Field[]>([])
    const [formContent, setFormContent] = useState<Form>()

    //outdated
    useEffect(() => {
        fetch(`http://localhost:3310/api/fields/${form_id}`)
            .then((response) => response.json())
            .then((data) => setFieldList(data))
    }, [form_id])

    //outdated
    useEffect(() => {
        fetch(`http://localhost:3310/api/forms/${form_id}`)
            .then((response) => response.json())
            .then((data) => setFormContent(data))
    }, [form_id])

    //CETTE FONCTION N'EST PLUS PLANIFIEE
    // function handleChangeIsClosed(){
    //     setFormContent((prev)=>({...prev, is_closed: !prev.is_closed}))
    // }

    return (<>
        <div>
            <h2>Header (todo)</h2>
            <p>with: nb of answers: {formContent.answers.length}</p> {/* attention, formContent.answers n'existe pas encore, ce n'est qu'une illustration */}
            <p>creation date: {formContent?.creation_date?formContent.creation_date:"Erreur, formulaire inconnu"}</p>
            <p>with: export</p>
        {/* CETTE FONCTION N'EST PLUS PLANIFIEE */}
            {/* <input type="checkbox" id="isClosed" name="isClosed" checked={formContent?.is_closed} onChange={handleChangeIsClosed}>with: close</input> */}
            {/* <p>with: autoclose</p>
            <p>with: autoclose date</p>
            <p>with: save</p> */}
            
        </div>
        <div>
            {fieldList.map((field) => (
                <DataField key={field.ordering} field={field} />
            ))}
        </div>
    </>)
}

export default DataTab