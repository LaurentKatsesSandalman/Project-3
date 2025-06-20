import type { Field, FieldPayload } from "./fields";
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
