import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { FieldAnswer } from "../types/field";
import { OptionResultWithFieldId } from "../types/result";

export async function findAllFieldAnswers(
    form_id: number
): Promise<FieldAnswer[]> {
    const [rows] = await database.query(
        `
        SELECT fa.field_answer_id, fa.form_answer_id, fa.value, fa.field_id
        FROM field_answer fa
        JOIN field ON field.field_id = fa.field_id
        WHERE field.form_id = ?
    `,
        [form_id]
    );
    return rows as FieldAnswer[];
}

export async function findOptionResults(
    form_id: number
): Promise<OptionResultWithFieldId[]> {
    const [rows] = await database.query(
        `
        SELECT fa.field_id, fa.value, COUNT(*) AS count
        FROM field_answer fa
        JOIN field ON field.field_id = fa.field_id
        WHERE field.form_id = ?
        AND field.field_type_id IN (2, 7, 12)
        GROUP BY fa.field_id, fa.value
    `,
        [form_id]
    );
    return rows as OptionResultWithFieldId[];
}
