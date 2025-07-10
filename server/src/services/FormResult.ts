import { findAllFields } from "../models/field.model";
import {
    findAllFieldAnswers,
    findOptionResults,
} from "../models/fieldanswer.model";
import { findMainResultData } from "../models/form.model";
import { Field, FieldAnswer } from "../types/field";
import {
    FormResult,
    MainResult,
    OptionResultWithFieldId,
} from "../types/result";

export const findFormResultById = async (form_id: number) => {
    // First part of our object, info about the form
    const mainResultData: MainResult = await findMainResultData(form_id);
    if (!mainResultData) return null;

    // Second part of our object, info about the fields for this form
    const fieldsInfo: Field[] | undefined = await findAllFields(form_id);
    if (!fieldsInfo) return null;

    // Third part of our object, info about the answers for all fields
    const fieldsAnswers: FieldAnswer[] | undefined = await findAllFieldAnswers(
        form_id
    );
    if (!fieldsAnswers) return null;

    // Fourth part of object, aggregate data for the right field_type
    const aggregateAnswers: OptionResultWithFieldId[] | undefined =
        await findOptionResults(form_id);
    if (!aggregateAnswers) return null;

    // Building of our big object
    const formResult = {
        user_id: mainResultData.user_id,
        form_name: mainResultData.form_name,
        creation_date: mainResultData.creation_date,
        total_answers: mainResultData.total_answers,
        field_results:
            fieldsInfo.map((field) => {
                return {
                    field_id: field.field_id,
                    field_type_id: field.field_type_id,
                    field_name: field.field_name,
                    results:
                        fieldsAnswers
                            .filter(
                                (result) => result.field_id === field.field_id
                            )
                            .map((result) => {
                                return {
                                    field_answer_id: result.field_answer_id,
                                    form_answer_id: result.form_answer_id,
                                    value: result.field_answer_value,
                                };
                            }) || [],
                    options_results:
                        aggregateAnswers
                            .filter(
                                (result) => result.field_id === field.field_id
                            )
                            .map((result) => {
                                return {
                                    value: result.field_answer_value,
                                    count: result.count,
                                };
                            }) || [],
                };
            }) || [],
    };

    return formResult;
};
