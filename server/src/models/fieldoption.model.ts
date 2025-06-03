import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { FieldOption } from "../types/field";

// copied on user, which was TEMP
export async function findAllOptions(field_id:number): Promise<FieldOption[]> {
    const [rows] = await database.query<FieldOption[] & RowDataPacket[]>(`SELECT * FROM field_option WHERE field_id=?`, [field_id]);
    return rows;
}

export async function findOptionById(id: number): Promise<FieldOption | undefined> {
    const [rows] = await database.query<FieldOption[] & RowDataPacket[]>(`SELECT * FROM field_option WHERE id=?`, [id]);
    return rows[0];
}

export async function insertOption({ordering, name, value, field_id}): Promise<FieldOption> { // connerie !! le field Id est dans les params !!!!!!!!
    const fields = ["ordering", "name", "value", "field_id"]
    const values = [ordering, name, value, field_id]

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO field_option (${fields.join(",")})
        VALUES (${connectingElement})
    `;
    // Insert a new field option into field_option table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<FieldOption[] & RowDataPacket[]>(`SELECT * FROM field_option WHERE id = ? `, [result.insertId]);

    if (rows.length === 0) {
        throw new Error("Option insérée mais ne semble pas être trouvée");
    }
    // Returns the new field
    return rows[0];
}

// NO OPTION TO UPDATE, USER CAN ONLY CREATE OR DELETE
// export async function updateOption

export async function deleteOptionById(id: number){
   const[result]= await database.query<ResultSetHeader>(`DELETE FROM field_option WHERE id=?`, id);
 if(result.affectedRows===0){
    throw new Error("L'option à supprimer ne semble pas être trouvée");
 }
 if(result.affectedRows>1){
    throw new Error ("Problème majeur: plus d'une entrée vient d'être supprimée")
 }
return result;
}

