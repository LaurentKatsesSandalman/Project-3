import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Theme, ThemePayload } from "../types/theme";
import database from "./db_model";

export async function themeById(id: number): Promise<Theme | undefined> {
    const [rows] = await database.query<Theme[] & RowDataPacket[]>(
        `SELECT * FROM theme WHERE theme_id=?`,
        [id]
    );
    return rows[0];
}

export async function insertTheme(
    theme: ThemePayload
): Promise<Theme | undefined> {
    const fields = [
        "color_value",
        "font1_size",
        "font2_size",
        "font1_value",
        "font2_value",
    ];
    const values = [
        theme.color_value,
        theme.font1_size,
        theme.font2_size,
        theme.font1_value,
        theme.font2_value,
    ];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO theme (${fields.join(",")})
        VALUES (${connectingElement})`;
    console.log(sqlQuery);
    // Insert a new theme into form table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);
    const [rows] = await database.query<Theme[] & RowDataPacket[]>(
        `SELECT * FROM theme WHERE theme_id = ? `,
        [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error("Nouveau theme inséré mais ne semble pas être trouvé");
    }
    // Returns the new form
    return rows[0];
}
