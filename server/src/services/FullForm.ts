import {
  findAllFields,
  findFieldById,
  insertField,
  updateField,
  deleteFieldById
} from "../models/field.model";
import { deleteOptionById, findAllOptions, findOptionById, insertOption } from "../models/fieldoption.model";
import { findFormById, updateForm } from "../models/form.model";
import { themeById } from "../models/theme.model";
import { Field, FieldOption, FieldPayload } from "../types/field";
import { Form, FullFormPayload } from "../types/form";
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
      const fieldOptions: FieldOption[] | undefined = await findAllOptions(
        field.field_id
      );

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

export const updateFullForm = async (form: FullFormPayload) => {
  //update form only
  const initialForm: Form | undefined = await findFormById(form.form_id);
  const updatedForm: Partial<Form> = {};
  if (initialForm) {
    updatedForm.form_id = form.form_id;
    if (initialForm.is_deployed !== form.is_deployed) {
      updatedForm.is_deployed = form.is_deployed;
    }
    if (initialForm.is_closed !== form.is_closed) {
      updatedForm.is_closed = form.is_closed;
    }
    if (initialForm.is_public !== form.is_public) {
      updatedForm.is_public = form.is_public;
    }
    if (initialForm.multi_answer !== form.multi_answer) {
      updatedForm.multi_answer = form.multi_answer;
    }
    if (initialForm.theme_id !== form.theme.theme_id) {
      updatedForm.theme_id = form.theme.theme_id;
    }
    if (initialForm.form_name !== form.form_name) {
      updatedForm.form_name = form.form_name;
    }
    if (initialForm.form_description !== form.form_description) {
      updatedForm.form_description = form.form_description;
    }
    if (
      form.date_to_close &&
      initialForm.date_to_close !== form.date_to_close
    ) {
      updatedForm.date_to_close = form.date_to_close;
    }

    const updatedFormOnly = await updateForm(updatedForm);
  }

  //update fields & options

  //prepare delete fields
  const initialFields = await findAllFields(form.form_id);
  const initialFieldsIds: number[] = [];
  if (initialFields) {
    for (const field of initialFields) {
      initialFieldsIds.push(field.field_id);
    }
  }
  const remainingFieldsIds: number[] = [];

  //start update
  for (const field of form.fields) {
    if (!field.field_id) {
      const newField = await insertField(field);
      if (field.field_options.length > 0) {
        for (const option of field.field_options) {await insertOption(option)};
      }
    } else {
      remainingFieldsIds.push(field.field_id);
      // prepare delete options
      const initialOptions = await findAllOptions(field.field_id);
      const initialOptionsIds: number[] = [];
      if (initialOptions) {
        for (const option of initialOptions) {
          initialOptionsIds.push(option.field_option_id);
        }
      }
      const remainingOptionsIds: number[] = [];

      const initialField: Field | undefined = await findFieldById(field.field_id);
      if (initialField && initialField !== field) {
        const updatedField = await updateField(field);
      }
      if (field.field_options.length > 0) {
        for (const option of field.field_options) {
            if(!option.field_option_id)
           { await insertOption(option)}
            else{
                
                const initialOption: FieldOption|undefined = await findOptionById (option.field_option_id)
                if(initialOption&& initialOption !== option){
                    await insertOption(option) // no update on options
                }
                if(initialOption&& initialOption === option){
                    remainingOptionsIds.push(option.field_option_id)
                }
            }};
      }
      //delete obsolete options
      if(initialOptionsIds.length>0){
        for(let i=0;i<initialOptionsIds.length;i++)
            if(!remainingOptionsIds.includes(initialOptionsIds[i])){
                await deleteOptionById(initialOptionsIds[i])
            }
      }
    }
  }

  //delete obsolete fields
     if(initialFieldsIds.length>0){
        for(let i=0;i<initialFieldsIds.length;i++)
            if(!remainingFieldsIds.includes(initialFieldsIds[i])){
                await deleteFieldById(initialFieldsIds[i])
            }
      }
};
