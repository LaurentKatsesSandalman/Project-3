// Back => Front
export interface FieldOption {
    field_option_id: number;
    option_order: number;
    option_name: string;
    option_value: string;
    field_id: number;
}

export interface Field {
    field_id: number;
    field_ordering: number;
    field_name: string;
    field_description: string | null;
    default_value: string | null;
    is_required: boolean;
    is_unique: boolean;
    field_type_id: number;
    field_options: FieldOption[] | [];
}
