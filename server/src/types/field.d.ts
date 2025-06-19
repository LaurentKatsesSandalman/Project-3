//Typing for field

import { RowDataPacket } from "mysql2";

export interface FieldPayload {
    ordering: number;
    name: string;
    description?: string | null;
    default_value?: string;
    is_required: boolean;
    is_unique: boolean;
    form_id: number;
    field_type_id: number;
}

export interface Field extends RowDataPacket {
    field_id: number;
    ordering: number;
    name: string;
    description?: string | null;
    default_value?: string;
    is_required: boolean;
    is_unique: boolean;
    form_id: number;
    field_type_id: number;
}

export interface FieldOption extends RowDataPacket {
    field_option_id: number;
    ordering: number;
    name: string;
    value: string;
    field_id: number;
}

export interface FullField extends Field {
    field_options: FieldOption[];
}
