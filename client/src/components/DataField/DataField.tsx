import type { Field } from "../../types/field"

interface DataFieldProps{
    field: Field
}

function DataField({field}:DataFieldProps){


    return(<>
    <p>Pipo data field</p>
    </>)
}

export default DataField