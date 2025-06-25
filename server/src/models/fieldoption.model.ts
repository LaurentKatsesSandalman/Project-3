import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { FieldOption, FieldOptionPayload } from "../types/field";

// copied on user, which was TEMP
export async function findAllOptions(field_id: number): Promise<FieldOption[]> {
  const [rows] = await database.query<FieldOption[] & RowDataPacket[]>(
    `SELECT * FROM field_option WHERE field_id=? ORDER BY field_option.option_ordering`,
    [field_id]
  );
  return rows;
}

export async function findOptionById(
  id: number
): Promise<FieldOption | undefined> {
  const [rows] = await database.query<FieldOption[] & RowDataPacket[]>(
    `SELECT * FROM field_option WHERE field_option_id=?`,
    [id]
  );
  return rows[0];
}

export async function insertOption(
  option: FieldOptionPayload
): Promise<FieldOption> {
  const fields = ["option_ordering", "option_name", "option_value", "field_id"];
  const values = [
    option.option_ordering,
    option.option_name,
    option.option_value,
    option.field_id,
  ];

  const connectingElement = values.map(() => "?").join(",");
  const sqlQuery = `
        INSERT INTO field_option (${fields.join(",")})
        VALUES (${connectingElement})
    `;
  // Insert a new field option into field_option table
  const [result] = await database.query<ResultSetHeader>(sqlQuery, values);
  const [rows] = await database.query<FieldOption[] & RowDataPacket[]>(
    `SELECT * FROM field_option WHERE field_option_id = ? `,
    [result.insertId]
  );

  if (rows.length === 0) {
    throw new Error("Option insérée mais ne semble pas être trouvée");
  }
  // Returns the new field
  return rows[0];
}

// NO OPTION TO EDIT, USER CAN ONLY BRAD

export async function deleteOptionById(id: number) {
  const [result] = await database.query<ResultSetHeader>(
    `DELETE FROM field_option WHERE field_option_id=?`,
    id
  );
  if (result.affectedRows === 0) {
    throw new Error("L'option à supprimer ne semble pas être trouvée");
  }
  if (result.affectedRows > 1) {
    throw new Error(
      "Problème majeur: plus d'une entrée vient d'être supprimée"
    );
  }
  return result;
}
