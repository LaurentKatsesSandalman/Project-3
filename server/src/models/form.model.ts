import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Form } from "../types/form";
import { IdPartial } from "../types/idpartial";
import { Field, FieldOption } from "../types/field";

export async function findAllForms(user_id: number): Promise<Form[]> {
  const [rows] = await database.query<Form[]>(
    `SELECT * FROM form WHERE user_id=?`,
    [user_id]
  );

  return rows;
}

export async function findAllFieldsId(
  form_id: number
): Promise<IdPartial[] | undefined> {
  const [rows] = await database.query<IdPartial[]>(
    `SELECT id FROM field WHERE form_id=?`,
    [form_id]
  );
  return rows;
}

export async function findAllOptionsIds(
  array: number[]
): Promise<IdPartial[] | undefined> {
  const [rows] = await database.query<IdPartial[]>(
    `SELECT id FROM field_option WHERE field_id IN ?`,
    [array]
  );
  return rows;
}

export async function findFormById(id: number): Promise<Form | undefined> {
  // c'est l'équivalent de fields dans les autres fichiers, mais ici field est déjà utilisé
  const keys = [];
  const values = [id];
  let sql1 = `SELECT * FROM form LEFT JOIN field ON field.form_id=form.form_id LEFT JOIN field_options ON field_options.field_id = field.field_id WHERE form_id=?`;

  const fields = await findAllFieldsId(id);
  const fieldsId: number[] = [];
  if (Array.isArray(fields) && fields.length > 0) {
    for (const field of fields) {
      fieldsId.push(field.id);
      values.push(field.id);
    }
    sql1 += ` AND field.field_id IN (${fieldsId.map((id) => `?`).join(",")}) `;
    const fieldsOptions = await findAllOptionsIds(fieldsId);
    const optionsId: number[] = [];
    if (Array.isArray(fieldsOptions) && fieldsOptions.length > 0) {
      for (const option of fieldsOptions) {
        optionsId.push(option.id);
        values.push(option.id);
      }
      sql1+=
    }
  }

  //ARRET ICI, SAVE DU SOIR

  // const [rows] = await database.query<Form[] & RowDataPacket[]>(`SELECT * FROM form WHERE id=?`, [id]);
  return rows[0];
}
