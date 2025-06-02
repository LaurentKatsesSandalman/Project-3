//Typing for field

export interface Field {
    id: number;
    ordering: number;
    name: string;
    description?: string;
    default_value?: string;
    is_required: boolean;
    is_unique: boolean;
    form_id: number;
    field_type_id: number;
}

// export interface NewFieldInput {

// }

export interface FieldOptions {
    id: number;
    ordering: number;
    name: string;
    value: string;
    field_id: number;
}
