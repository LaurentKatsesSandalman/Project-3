import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { FormAnswer, FormatedFieldAnswer } from "../types/answer";

export async function findAllAnswers(form_id: number): Promise<FormAnswer[]> {
    const [rows] = await database.query<FormAnswer[] & RowDataPacket[]>(
        `SELECT * FROM form_answer WHERE form_id=?`,
        [form_id]
    );
    return rows;
}

export async function findAnswerById(
    id: number
): Promise<FormAnswer | undefined> {
    const [rows] = await database.query<FormAnswer[] & RowDataPacket[]>(
        `SELECT * FROM form_answer WHERE form_answer_id=?`,
        [id]
    );
    return rows[0];
}

// Get the number of times a form_answer of said value already exist
export async function countNbrSameValue(
    field_id: number,
    value: string
): Promise<number> {
    const [rows] = await database.query<FormAnswer[] & RowDataPacket[]>(
        `SELECT COUNT(*) AS count 
        FROM field_answer 
        WHERE field_id=? AND value=?`,
        [field_id, value]
    );
    return rows[0].count;
}

// Add a new FormAnswer and returns it
export async function insertFormAnswer(form_id: number): Promise<FormAnswer> {
    const [result] = await database.query<ResultSetHeader>(
        `INSERT INTO form_answer (form_id)
        VALUES (?)`,
        [form_id]
    );
    const [rows] = await database.query<FormAnswer[]>(
        `SELECT *
        FROM form_answer
        WHERE form_answer_id = ?`,
        [result.insertId]
    );
    if (rows.length === 0) {
        throw new Error(
            "Formulaire réponse inséré mais ne semble pas être trouvé"
        );
    }

    return rows[0];
}

// Add all the fields answers to field_answer
export async function insertFieldAnswers(
    fieldAnswers: FormatedFieldAnswer[]
): Promise<void> {
    if (fieldAnswers.length === 0) return;

    const fields = ["form_answer_id", "value", "field_id"];
    const values: (string | number)[] = [];
    for (const answer of fieldAnswers) {
        values.push(answer.form_answer_id);
        values.push(answer.value);
        values.push(answer.field_id);
    }

    const connectingElement = fieldAnswers.map(() => "(?,?,?)").join(",");
    const sqlQuery = `
    INSERT INTO field_answer (${fields})
    VALUES ${connectingElement}`;

    await database.query<ResultSetHeader>(sqlQuery, values);
}
