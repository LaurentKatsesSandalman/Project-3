//Typing for field

import { RowDataPacket } from "mysql2";

export interface FieldPayload {
    field_id?: number;
    field_ordering: number;
    field_name: string;
    field_description?: string | null;
    default_value?: string | null;
    is_required: boolean;
    is_unique: boolean;
    form_id: number;
    field_type_id: number;
    field_options: FieldOptionPayload[] | [];
}

export interface Field extends RowDataPacket {
    field_id: number;
    field_ordering: number;
    field_name: string;
    field_description?: string | null;
    default_value?: string;
    is_required: boolean;
    is_unique: boolean;
    form_id: number;
    field_type_id: number;
}

export interface FieldOption extends RowDataPacket {
    field_option_id: number;
    option_ordering: number;
    option_name: string;
    option_value: string;
    field_id: number;
}

export interface FieldOptionPayload {
    field_option_id?: number;
    option_ordering: number;
    option_name: string;
    option_value: string;
    field_id?: number;
}

export interface FullField extends Field {
    field_options: FieldOption[];
}

export interface FieldAnswer extends RowDataPacket {
    field_answer_id: number;
    form_answer_id: number;
    field_id: number;
    value: string;
}
