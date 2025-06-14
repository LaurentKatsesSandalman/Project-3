import type { Field } from "react-hook-form";
import type { Theme } from "./theme";

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
