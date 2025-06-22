import { findAllFields } from "../models/field.model";
import {
    findAllFieldAnswers,
    findOptionResults,
} from "../models/fieldanswer.model";
import { findMainResultData } from "../models/form.model";
import { Field, FieldAnswer } from "../types/field";
import { FormResult, OptionResultWithFieldId } from "../types/result";

export const findFormResultById = async (form_id: number) => {
    const mainResultData: Partial<FormResult> = await findMainResultData(
        form_id
    );
    if (!mainResultData) return null;

    const fieldsInfo: Field[] | undefined = await findAllFields(form_id);
    if (!fieldsInfo) return null;

    const fieldsAnswers: FieldAnswer[] | undefined = await findAllFieldAnswers(
        form_id
    );
    if (!fieldsAnswers) return null;

    const aggregateAnswers: OptionResultWithFieldId[] | undefined =
        await findOptionResults(form_id);
    if (!aggregateAnswers) return null;

    const formResult = {
        user_id: mainResultData.user_id,
        form_name: mainResultData.form_name,
        creation_date: mainResultData.creation_date,
        total_answers: mainResultData.total_answers,
        fields:
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
                                    value: result.value,
                                };
                            }) || [],
                    options_results:
                        aggregateAnswers
                            .filter(
                                (result) => result.field_id === field.field_id
                            )
                            .map((result) => {
                                return {
                                    value: result.value,
                                    count: result.count,
                                };
                            }) || [],
                };
            }) || [],
    };

    return formResult;
};
