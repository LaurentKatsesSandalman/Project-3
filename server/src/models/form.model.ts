import database from "./db_model.ts";

export async function findAllForms(user_id) {
    const [rows] = await database.query(`SELECT * FROM form WHERE user_id=?`, [
        user_id,
    ]);
    return rows;
}
