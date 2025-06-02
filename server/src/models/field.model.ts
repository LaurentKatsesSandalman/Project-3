import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Field, FieldOptions } from "../types/field";

// copied on user, which was TEMP
export async function findAllFields(form_id): Promise<Field[]> {
    const [rows] = await database.query<Field[] & RowDataPacket[]>(`SELECT * FROM field WHERE form_id=?`, [form_id]);
    return rows;
}

export async function findFieldById(id: number): Promise<Field | undefined> {
    const [rows] = await database.query<Field[] & RowDataPacket[]>(`SELECT * FROM field WHERE id=?`, [id]);
    return rows[0];
}

export async function insertField({ ordering, name, description = null, defaultValue = null, isRequired = 0, isUnique = 0, formId, fieldTypeId }): Promise<Field> {
    const fields = ["ordering", "name", "description", "default_value", "is_required", "is_unique", "form_id", "field_type_id"]
    const values = [ordering, name, description, defaultValue, isRequired, isUnique, formId, fieldTypeId]

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO field (${fields.join(",")})
        VALUES (${connectingElement})
    `;

    // Insert a new field into field table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);

    const [rows] = await database.query<Field[] & RowDataPacket[]>(`SELECT * FROM field WHERE id = ? `, [result.insertId]);

    if (rows.length === 0) {
        throw new Error("Champ réponse inséré mais ne semble pas être trouvé");
    }

    // Returns the new field
    return rows[0];
}

export async function updateField({ id, ordering, name, description = null, defaultValue = null, isRequired = 0, isUnique = 0, formId, fieldTypeId }): Promise<Field> {
    const fields = ["ordering", "name", "description", "default_value", "is_required", "is_unique", "form_id", "field_type_id"]
    const values = [ordering, name, description, defaultValue, isRequired, isUnique, formId, fieldTypeId, id]

    const contentSet = fields.map((field) => `${field}=?`).join(",")

    const sqlQuery = `
        UPDATE field 
        SET ${contentSet}
       WHERE id=?
    `;

    // Replace the field values
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);

    const [rows] = await database.query<Field[] & RowDataPacket[]>(`SELECT * FROM field WHERE id = ? `, [result.insertId]);

    if (rows.length === 0) {
        throw new Error("Champ réponse modifié mais ne semble pas être trouvé");
    }

    // Returns the new field
    return rows[0];
}

