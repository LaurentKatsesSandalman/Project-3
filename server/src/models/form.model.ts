import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Form, FormPayload } from "../types/form";
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

export async function insertForm(form:FormPayload):Promise<Form | undefined> {
  const fields = [
    "is_deployed",
    "is_closed",
    "is_public",
    "multi_answer",
    "theme_id",
    "form_name",
    "user_id",
  ];
  const values = [
  form.is_deployed,
  form.is_closed,
  form.is_public,
  form.multi_answer,
  form.theme_id,
  form.form_name,
  form.user_id,
  ];

if (form.date_to_close){
    fields.push("date_to_close")
    values.push(form.date_to_close)
}

if (form.form_description){
    fields.push("description")
    values.push(form.form_description)
}

  const connectingElement = values.map(() => "?").join(",");
  const sqlQuery = `
        INSERT INTO field (${fields.join(",")})
        VALUES (${connectingElement})
    `;
  // Insert a new field into field table
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
