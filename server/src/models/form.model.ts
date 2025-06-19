import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { Form } from "../types/form";
import { Field, FieldOption } from "../types/field";

export async function findAllForms(user_id: number): Promise<Form[]> {
    const [rows] = await database.query<Form[]>(
        `SELECT * FROM form WHERE user_id=?`,
        [user_id]
    );

    return rows;
}

// export async function findFormById(id: number): Promise<Form[] | undefined> {
//     const [rows] = await database.query<Form[] & RowDataPacket[]>(
//         `SELECT *, field.field_id AS field_id FROM form
//     JOIN field ON field.form_id=form.form_id
//     LEFT JOIN field_option ON field_option.field_id = field.field_id
//     WHERE form.form_id=?`,
//         //ORDER BY field.field_id`,
//         [id]
//     );
//     return rows;
// }

export async function findFormById(id: number): Promise<Form | undefined> {
    const [rows] = await database.query<Form[] & RowDataPacket[]>(
        `SELECT * FROM form
    WHERE form.form_id=?`,
        [id]
    );
    return rows[0];
}
