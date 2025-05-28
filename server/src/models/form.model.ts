import database from "./db_model.ts";

export async function findAllForms() {
    const [rows] = await database.query(`SELECT * FROM form`);
    return rows;
}