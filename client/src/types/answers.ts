export interface FieldAnswer {
    field_id: number;
    value: string;
    is_unique: boolean;
}

export interface Result {
    field_answer_id: number;
    form_answer_id: number;
    value: string;
}

export interface OptionResult {
    value: string;
    count: number;
}
