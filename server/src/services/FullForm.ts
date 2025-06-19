import { findAllFields } from "../models/field.model";
import { findAllOptions } from "../models/fieldoption.model";
import { findFormById } from "../models/form.model";
import { themeById } from "../models/theme.model";
import { Field, FieldOption } from "../types/field";
import { Form } from "../types/form";
import { Theme } from "../types/theme";

export const getFullForm = async (form_id: number) => {
    const form: Form | undefined = await findFormById(form_id);
    if (!form) return null;

    const theme: Theme | undefined = await themeById(form.theme_id);
    if (!theme) return null;
    //const { theme_id, ...formatedTheme } = theme;

    const mainForm = {
        ...form,
        is_deployed: Boolean(form.is_deployed),
        is_closed: Boolean(form.is_closed),
        is_public: Boolean(form.is_public),
        multi_answer: Boolean(form.multi_answer),
        theme: theme,
    };

    const fields: Field[] | undefined = await findAllFields(form.form_id);
    if (!fields) return null;

    const fieldsWithOptions = await Promise.all(
        fields.map(async (field) => {
            const fieldOptions: FieldOption[] | undefined =
                await findAllOptions(field.field_id);

            return {
                ...field,
                is_required: Boolean(field.is_required),
                is_unique: Boolean(field.is_unique),
                field_options: fieldOptions || [],
            };
        })
    );

    const fullForm = {
        ...mainForm,
        fields: fieldsWithOptions,
    };

    return fullForm;
};
