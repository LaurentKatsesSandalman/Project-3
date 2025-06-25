import {
  findAllFields,
  findFieldById,
  insertField,
  updateField,
  deleteFieldById,
} from "../models/field.model";
import {
  deleteOptionById,
  findAllOptions,
  findOptionById,
  insertOption,
} from "../models/fieldoption.model";
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
  //HEAD: update form only
  const initialForm: Form | undefined = await findFormById(form.form_id);

  const updatedForm: Partial<Form> = {};
  let iDontKnowHowToCheckIfObjectIsEmpty = true;
  if (initialForm) {
    console.log("initial theme id", initialForm.theme_id);
    console.log("form theme id", form.theme.theme_id);
    updatedForm.form_id = form.form_id;
    if (Number(initialForm.is_deployed) !== Number(form.is_deployed)) {
      console.log("initialForm.is_deployed", initialForm.is_deployed);
      console.log("form.is_deployed", form.is_deployed);
      updatedForm.is_deployed = form.is_deployed;
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    if (Number(initialForm.is_closed) !== Number(form.is_closed)) {
      updatedForm.is_closed = form.is_closed;
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    if (Number(initialForm.is_public) !== Number(form.is_public)) {
      updatedForm.is_public = form.is_public;
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    if (Number(initialForm.multi_answer) !== Number(form.multi_answer)) {
      updatedForm.multi_answer = form.multi_answer;
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    if (initialForm.theme_id !== form.theme.theme_id) {
      updatedForm.theme_id = form.theme.theme_id;
      console.log("theme_id", updatedForm.theme_id);
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    if (initialForm.form_name !== form.form_name) {
      updatedForm.form_name = form.form_name;
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    if (initialForm.form_description !== form.form_description) {
      updatedForm.form_description = form.form_description;
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    if (
      form.date_to_close &&
      initialForm.date_to_close !== form.date_to_close
    ) {
      updatedForm.date_to_close = form.date_to_close;
      iDontKnowHowToCheckIfObjectIsEmpty = false;
    }
    console.log("updated form", updatedForm);
    if (!iDontKnowHowToCheckIfObjectIsEmpty) {
      console.log("go to model");
      const updatedFormOnly = await updateForm(updatedForm);
    }
  }
  // HEAD: fin

  //update fields & options

  //FIELDS: F
  //F1: prepare delete fields
  const initialFields = await findAllFields(form.form_id);
  const initialFieldsIds: number[] = [];
  if (initialFields) {
    for (const field of initialFields) {
      initialFieldsIds.push(field.field_id);
    }
  }
  const remainingFieldsIds: number[] = [];

  //F2: start update of each field
  for (const field of form.fields) {
    //F2-a : new fields
    if (!field.field_id) {
      const fieldWithFormId = { ...field, form_id: form.form_id };
      const newField = await insertField(fieldWithFormId);
      //OPTIONS: O
      //F2-a-O1: options of new field
      if (field.field_options.length > 0) {
        for (const option of field.field_options) {
          const optionWithFieldId = { ...option, field_id: newField.field_id };
          await insertOption(optionWithFieldId);
        }
      }
      //F2-b : existing fields
    } else {
      remainingFieldsIds.push(field.field_id);
      //F2-b-O1 prepare delete options
      const initialOptions = await findAllOptions(field.field_id);
      const initialOptionsIds: number[] = [];
      if (initialOptions) {
        for (const option of initialOptions) {
          initialOptionsIds.push(option.field_option_id);
        }
      }
      const remainingOptionsIds: number[] = [];
      //F2-b compare with existing field in BDD
      const initialField: Field | undefined = await findFieldById(
        field.field_id
      );
      const newfield = {
        field_id: field.field_id,
        field_ordering: field.field_ordering,
        field_name: field.field_name,
        field_description: field.field_description,
        default_value: field.default_value,
        is_required: field.is_required,
        is_unique: field.is_unique,
        form_id: field.form_id,
        field_type_id: field.field_type_id,
      };
      //F2-b1 : not the same field, update field
      if (initialField && initialField !== newfield) {
        const updatedField = await updateField(field);
      }
      //F2-b-O2 : updated or not updated field, now let's focus on options
      if (field.field_options.length > 0) {
        for (const option of field.field_options) {
          //F2-b-O2-a : new option
          if (!option.field_option_id) {
            const optionWithFieldId = { ...option, field_id: field.field_id };
            await insertOption(optionWithFieldId);
            //F2-b-O2-b : existing option
          } else {
            const initialOption: FieldOption | undefined = await findOptionById(
              option.field_option_id
            );
            //F2-b-O2-b1: existing option has been updated => create a new one and prepare to delete (not added to remainingOptionsIds)
            if (initialOption && initialOption !== option) {
              const optionWithFieldId = { ...option, field_id: field.field_id };
              await insertOption(optionWithFieldId); // no update on options
            }
            //F2-b-O2-b2: existing option and not updated => add to remainingOptionsIds to prevent deletion
            if (initialOption && initialOption === option) {
              remainingOptionsIds.push(option.field_option_id);
            }
          }
        }
      }
      //F2-b-O2-c: delete obsolete options
      if (initialOptionsIds.length > 0) {
        for (let i = 0; i < initialOptionsIds.length; i++)
          if (!remainingOptionsIds.includes(initialOptionsIds[i])) {
            await deleteOptionById(initialOptionsIds[i]);
          }
      }
    }
  }

  //F2-c : delete obsolete fields
  if (initialFieldsIds.length > 0) {
    for (let i = 0; i < initialFieldsIds.length; i++)
      if (!remainingFieldsIds.includes(initialFieldsIds[i])) {
        await deleteFieldById(initialFieldsIds[i]);
      }
  }

  return true; // pour eviter l'erreur 404
};
