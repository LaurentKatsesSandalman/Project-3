import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { Form, FormPayload } from "../types/form";
import { Field, FieldOption } from "../types/field";
import { FormResult, MainResult } from "../types/result";


export async function findAllForms(user_id: number): Promise<Form[]> {
    const [rows] = await database.query<Form[]>(
        `SELECT * FROM form WHERE user_id=?`,
        [user_id]
    );

    return rows;
}

export async function findFormById(id: number): Promise<Form | undefined> {
    const [rows] = await database.query<Form[] & RowDataPacket[]>(
        `SELECT * FROM form
    WHERE form.form_id=?`,
        [id]
    );
    return rows[0];
}

export async function insertForm(form: FormPayload): Promise<Form | undefined> {
    const fields = [
        "is_deployed",
        "is_closed",
        "is_public",
        "multi_answer",
        "theme_id",
        "form_name",
        "form_description",
        "user_id",
    ];
    const values = [
        form.is_deployed,
        form.is_closed,
        form.is_public,
        form.multi_answer,
        form.theme_id,
        form.form_name,
        form.form_description,
        form.user_id,
    ];

    if (form.date_to_close) {
        fields.push("date_to_close");
        values.push(form.date_to_close);
    }

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO form (${fields.join(",")})
        VALUES (${connectingElement})
    `;
    // Insert a new form into form table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Form[] & RowDataPacket[]>(
        `SELECT * FROM form WHERE form_id = ? `,
        [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error("Champ réponse inséré mais ne semble pas être trouvé");
    }
    // Returns the new form
    return rows[0];
}

export async function updateForm(form: Partial<Form>): Promise<Form> {
    const fields = [];
    const values = [];

    if (form.is_deployed !== null) {
        fields.push("is_deployed");
        values.push(form.is_deployed);
    }
    if (form.is_closed !== null) {
        fields.push("is_closed");
        values.push(form.is_closed);
    }
    if (form.is_public !== null) {
        fields.push("is_public");
        values.push(form.is_public);
    }
    if (form.multi_answer !== null) {
        fields.push("multi_answer");
        values.push(form.multi_answer);
    }
    if (form.theme_id !== null) {
        fields.push("theme_id");
        values.push(form.theme_id);
    }
    if (form.form_name !== null) {
        fields.push("form_name");
        values.push(form.form_name);
    }
    if (form.form_description !== null) {
        fields.push("form_description");
        values.push(form.form_description);
    }
    if (form.date_to_close !== null) {
        fields.push("date_to_close");
        values.push(form.date_to_close);
    }

    if (typeof form.form_id !== "number") {
        throw new Error("Form_id should be num");
    }
    values.push(form.form_id);
    const contentSet = fields.map((field) => `${field}=?`).join(",");
    const sqlQuery = `
        UPDATE form 
        SET ${contentSet}
       WHERE form_id=?
    `;

    // Replace the form values
    await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Form[] & RowDataPacket[]>(
        `SELECT * FROM form WHERE form_id = ? `,
        [form.form_id]
    );

    if (rows.length === 0) {
        throw new Error("Questionnaire modifié mais ne semble pas être trouvé");
    }
    // Returns the new advert
    return rows[0];
}

//Get the main data to a form, with nbr of answers
export async function findMainResultData(id: number): Promise<MainResult> {
    const [rows] = await database.query<MainResult & RowDataPacket[]>(
        `
        SELECT form.user_id, form.form_name, form.creation_date, COUNT (form_answer.form_id) AS total_answers
        FROM form
        LEFT JOIN form_answer ON form_answer.form_id = form.form_id
        WHERE form.form_id = ?
        GROUP BY form.form_id`,
        [id]
    );

    return rows[0];
}

export async function deleteFormById(id: number): Promise<boolean> {
    const [result] = await database.query<ResultSetHeader>(
        "DELETE FROM form WHERE form_id = ?",
        [id]
    );
    return result.affectedRows > 0;
}