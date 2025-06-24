import {
    countNbrSameValue,
    insertFieldAnswers,
    insertFormAnswer,
} from "../models/answer.model";
import { AnsweredFormPayload, FormatedFieldAnswer } from "../types/answer";

export const addAnsweredForm = async (answeredForm: AnsweredFormPayload) => {
    // console.log("VERIFICATIONS AVANT D'AJOUTER LES REPONSES", answeredForm);
    const uniqueFields = answeredForm.form_answers.filter(
        (answer) => answer.is_unique
    );

    // Look in the DB if a value already exist for a unique type field
    for (const field of uniqueFields) {
        const nbExistingValues: number = await countNbrSameValue(
            field.field_id,
            field.value
        );
        if (nbExistingValues !== 0) {
            // field.value for field.field_id is not unique
            throw new Error(`409:${field.field_id}:not unique`);
        }
    }

    const newFormAnswerId = await insertFormAnswer(answeredForm.form_id);
    if (!newFormAnswerId) return null;

    const noEmptyAnswerFields = answeredForm.form_answers.filter(
        (answer) => answer.value !== ""
    );
    const formatedAnswerFields = noEmptyAnswerFields.map(
        ({ field_id, value }) => ({
            field_id,
            value,
            form_answer_id: newFormAnswerId.form_answer_id,
        })
    ) as FormatedFieldAnswer[];

    //console.log(formatedAnswerFields);
    await insertFieldAnswers(formatedAnswerFields);
    //console.log("DONE");
};
