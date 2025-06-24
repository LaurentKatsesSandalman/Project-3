import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { Field, FieldPayload } from "../types/field";

// copied on user, which was TEMP
export async function findAllFields(form_id: number): Promise<Field[]> {
    const [rows] = await database.query<Field[] & RowDataPacket[]>(
        `SELECT * FROM field WHERE form_id=? ORDER BY field_ordering`,
        [form_id]
    );
    return rows;
}

export async function findFieldById(id: number): Promise<Field | undefined> {
    const [rows] = await database.query<Field[] & RowDataPacket[]>(
        `SELECT * FROM field WHERE field_id=?`,
        [id]
    );
    return rows[0];
}

export async function insertField({
    ordering,
    name,
    description = null,
    default_value = null,
    is_required = false,
    is_unique = false,
    form_id,
    field_type_id,
}: FieldPayload): Promise<Field> {
    const fields = [
        "ordering",
        "name",
        "description",
        "default_value",
        "is_required",
        "is_unique",
        "form_id",
        "field_type_id",
    ];
    const values = [
        ordering,
        name,
        description,
        default_value,
        is_required,
        is_unique,
        form_id,
        field_type_id,
    ];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO field (${fields.join(",")})
        VALUES (${connectingElement})
    `;
    // Insert a new field into field table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Field[] & RowDataPacket[]>(
        `SELECT * FROM field WHERE field_id = ? `,
        [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error("Champ réponse inséré mais ne semble pas être trouvé");
    }
    // Returns the new field
    return rows[0];
}

export async function updateField(
    field : FieldPayload): Promise<Field> {
    const fields = [
        "ordering",
        "name",
        "description",
        "default_value",
        "is_required",
        "is_unique",
        "form_id",
        "field_type_id",
    ];
    const values = [
        field.ordering,
        field.name,
        field.description,
       field.default_value,
       field.is_required,
        field.is_unique,
        field.form_id,
        field.field_type_id,
        field.field_id,
    ];

    const contentSet = fields.map((field) => `${field}=?`).join(",");
    const sqlQuery = `
        UPDATE field 
        SET ${contentSet}
       WHERE field_id=?
    `;

    // Replace the field values
    await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Field[] & RowDataPacket[]>(
        `SELECT * FROM field WHERE field_id = ? `,
        [field.field_id]
    );

    if (rows.length === 0) {
        throw new Error("Champ réponse modifié mais ne semble pas être trouvé");
    }
    // Returns the new field
    return rows[0];
}

export async function deleteFieldById(id: number) {
    const [result] = await database.query<ResultSetHeader>(
        `DELETE FROM field WHERE field_id=?`,
        id
    );
    if (result.affectedRows === 0) {
        throw new Error("Le champ à supprimer ne semble pas être trouvé");
    }
    if (result.affectedRows > 1) {
        throw new Error(
            "Problème majeur: plus d'une entrée vient d'être supprimée"
        );
    }
    return result;
}
