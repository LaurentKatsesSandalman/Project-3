import { RowDataPacket } from "mysql2";

// Front to Back
export interface AnswerPayload {
    field_id: number;
    is_unique: boolean;
    value: string;
}

export interface AnsweredFormPayload {
    form_id: number;
    form_answers: AnswerPayload[];
}

// Back to Front
export interface FormAnswer extends RowDataPacket {
    form_answer_id: number;
    answer_date: string;
    form_id: number;
}

export interface FieldAnswer extends RowDataPacket {
    field_answer_id: number;
    field_answer_value: string;
    form_answer_id: number;
    field_id: number;
}

export interface FormatedFieldAnswer extends RowDataPacket {
    field_id: number;
    value: string;
    form_answer_id: number;
}
