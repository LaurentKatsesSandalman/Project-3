import { RowDataPacket } from "mysql2";
import { Theme } from "../types/theme";
import database from "./db_model";

export async function themeById(id: number): Promise<Theme | undefined> {
    const [rows] = await database.query<Theme[] & RowDataPacket[]>(
        `SELECT * FROM theme WHERE theme_id=?`,
        [id]
    );
    return rows[0];
}
