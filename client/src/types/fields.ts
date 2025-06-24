import type { OptionResult, Result } from "./answers";

// Back => Front
export interface FieldOption {
    field_option_id: number;
    option_ordering: number;
    option_name: string;
    option_value: string;
    field_id: number;
}

export interface FieldResult {
    field_id: number;
    field_type_id: number;
    field_name: string;
    results: Result[] | [];
    options_results: OptionResult[] | [];
}

export interface FieldOptionPayload {
    option_ordering: number;
    option_name: string;
    option_value: string;
}

export interface Field {
    field_id: number;
    field_ordering: number;
    field_name: string;
    field_description: string;
    default_value: string | null;
    is_required: boolean;
    is_unique: boolean;
    field_type_id: number;
    field_options: FieldOption[] | [];
}

export interface FieldPayload {
    field_ordering: number;
    field_name: string;
    field_description: string;
    default_value: string | null;
    is_required: boolean;
    is_unique: boolean;
    field_type_id: number;
    field_options: FieldOptionPayload[] | [];
}
