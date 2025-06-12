import { RowDataPacket } from "mysql2";

export interface Form extends RowDataPacket {
    form_id: number;
    is_deployed: boolean;
    is_closed: boolean;
    date_to_close?: string;
    creation_date: string;
    is_public: boolean;
    multi_answer: boolean;
    original_version_id?: number;
    theme_id: number;
    user_id: number;
}

// TYPING THE DATA BACK => FRONT
export interface FieldOptionType {
    field_option_id: number;
    option_ordering: number;
    option_name: string;
    option_value: string;
}

export interface FieldType {
    field_id: number;
    field_ordering: number;
    field_name: string;
    field_description: string | null;
    default_value: string | number | null;
    is_required: boolean;
    is_unique: boolean;
    field_type_id: number;
    field_options: FieldOptionType[] | [];
}

export interface ThemeType {
    color_value: string;
    font1_size: number;
    font2_size: number;
    font1_value: string;
    font2_value: string;
}

export interface FormType {
    form_id: number;
    is_deployed: boolean;
    is_closed: boolean;
    date_to_close: string | null;
    creation_date: string;
    is_public: boolean;
    multi_answer: boolean;
    original_version_id?: number;
}
