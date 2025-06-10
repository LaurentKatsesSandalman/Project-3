import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import type { Field } from "../../types/field"
import DataField from "../DataField/DataField"
import type { Form } from "../../types/form"


function DataTab() {

    const { form_id } = useParams<{ form_id: string }>()
    // il faudra peut-être "remonter" fieldList/formContent dans Page DetailedForm pour ne pas fetcher
    // deux fois les mêmes infos dans DataTab et FormCreator
    const [fieldList, setFieldList] = useState<Field[]>([])
    const [formContent, setFormContent] = useState<Form>()

    useEffect(() => {
        fetch(`http://localhost:3310/api/fields/${form_id}`)
            .then((response) => response.json())
            .then((data) => setFieldList(data))
    }, [form_id])

    useEffect(() => {
        fetch(`http://localhost:3310/api/forms/${form_id}`)
            .then((response) => response.json())
            .then((data) => setFormContent(data))
    }, [form_id])

    function handleChangeIsClosed(){
        setFormContent((prev)=>({...prev, is_closed: !prev.is_closed}))
    }

    return (<>
        <div>
            <h2>Header (todo)</h2>
            <p>with: nb of answers</p>
            <p>creation date: {formContent?.creation_date?formContent.creation_date:"Erreur, formulaire inconnu"}</p>
            <p>with: export</p>
            <input type="checkbox" id="isClosed" name="isClosed" checked={formContent?.is_closed} onChange={handleChangeIsClosed}>with: close</input>
            <p>with: autoclose</p>
            <p>with: autoclose date</p>
            <p>with: save</p>
            
        </div>
        <div>
            {fieldList.map((field) => (
                <DataField key={field.ordering} field={field} />
            ))}
        </div>
    </>)
}

export default DataTab