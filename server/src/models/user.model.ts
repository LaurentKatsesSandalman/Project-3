import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../types/user";
import database from "./db_model.ts";

// TEMP, used for practice
export async function findAllUsers(): Promise<User[]> {
    const [rows] = await database.query<User[] & RowDataPacket[]>(`
        SELECT *
        FROM user`);
    return rows;
}

// Build SQL query to insert new user
export async function insertUser({ email, password }): Promise<User> {
    const fields = ["email", "password"];
    const values = [email, password];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO user (${fields.join(",")})
        VALUES (${connectingElement})
    `;

    // Insert a new user into user table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);

    // Select only the id and email of the new user
    const [rows] = await database.query<User[] & RowDataPacket[]>(
        `SELECT id, email FROM user WHERE id = ?`,
        [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error("Utilisateur inséré mais ne semble pas être trouvé");
    }

    // Returns the new user without the password to the client
    return rows[0];
}
