import { RowDataPacket } from "mysql2";

export interface OptionResult {
    value: string;
    count: number;
}

export interface OptionResultWithFieldId extends OptionResult {
    field_id: number;
}

export interface Result {
    field_answer_id: number;
    form_answer_id: number;
    value: string;
}

export interface FieldResult {
    field_id: number;
    field_type_id: number;
    field_name: string;
    results: Result[] | [];
    options_results: OptionResult[] | [];
}

export interface MainResult extends RowDataPacket {
    user_id: number;
    form_name: string;
    creation_date: Date;
    total_answers: number;
}

export interface FormResult {
    user_id: number;
    form_name: string;
    creation_date: Date;
    total_answers: number;
    field_results: FieldResult[] | [];
}
