import type { Field } from "../../types/field"
import { useState } from "react"

interface DataFieldProps{
    field: Field
}

function DataField({field}:DataFieldProps){
// je ne vois pas comment faire le mapping en fonction du type dans datatab
// (car le type de display aggregate n'est pas exactement le même que le type de display answer)
// donc je le fais ici
const [fieldDisplay, setFieldDisplay] = useState< "flat"|"bar"|"cheese">("flat")

switch (field.field_type_id)
{
    case 1 : {
        setFieldDisplay("flat")
        break;
    }
    case 2 : {
        setFieldDisplay("bar")
        break;
    }
}
    

    return(<>
    <p>{field.name}</p>
    <p>{field.description}</p>
    {fieldDisplay==="flat"&&<FlatAnswers/>}
    {fieldDisplay==="bar"&&<BarAnswers/>}
    {fieldDisplay==="cheese"&&<CheeseAnswers/>}
    </>)
}

export default DataField