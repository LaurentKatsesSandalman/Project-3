import { RowDataPacket } from "mysql2";
import { FullField } from "./field";

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

export interface FullForm extends Form {
    fields: FullField[];
}
