//Typing for field

export interface Field {
    field_id: number;
    ordering: number;
    name: string;
    description?: string;
    default_value?: string;
    is_required: boolean;
    is_unique: boolean;
    form_id: number;
    field_type_id: number;
}

export interface FieldOption {
    field_option_id: number;
    ordering: number;
    name: string;
    value: string;
    field_id: number;
}
