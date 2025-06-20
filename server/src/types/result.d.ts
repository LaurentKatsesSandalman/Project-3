export interface OptionResult {
    value: string;
    count: number;
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
    results: Result[];
    options_results: OptionResult[];
}

export interface FormResult {
    user_id: number;
    form_name: string;
    creation_date: Date;
    total_answers: number;
    field_result: FieldResult[];
}
