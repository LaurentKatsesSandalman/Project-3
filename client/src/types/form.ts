import type { Field, FieldPayload, FieldResult } from "./fields";
import type { Theme } from "./theme";

export interface Form {
    form_id: number;
    is_deployed: boolean;
    is_closed: boolean;
    date_to_close?: string | null;
    creation_date: string | null;
    is_public: boolean;
    multi_answer: boolean;
    original_version_id?: number;
    theme_id: number;
    user_id: number;
    form_name: string;
    form_description: string;
}
export interface FormItem {
    form_id: number;
    form_name: string;
    creation_date: string;
    is_closed: boolean;
}
// Back => Front
export interface SecuredForm {
    form_id: number;
    date_to_close: string | null;
    creation_date: string;
    multi_answer: boolean;
    form_name: string;
    form_description: string;
    theme: Theme;
    fields: Field[] | [];
}

export interface FormResultType {
    user_id: number;
    form_name: string;
    creation_date: string;
    total_answers: number;
    field_results: FieldResult[] | [];
}

// Front => Back
export interface FormPayload {
    is_deployed: boolean;
    is_closed: boolean;
    date_to_close: string | null;
    is_public: boolean;
    multi_answer: boolean;
    form_name: string;
    form_description: string;
    theme: Theme;
    fields: FieldPayload[] | [];
}
