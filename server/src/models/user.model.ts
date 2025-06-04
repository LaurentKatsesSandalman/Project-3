import bcrypt from "bcrypt";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { completeUser, User } from "../types/user";

// TEMP, used for practice
export async function findAllUsers(): Promise<User[]> {
    const [rows] = await database.query<User[] & RowDataPacket[]>(`
        SELECT *
        FROM user`);
    return rows;
}

// Build SQL query to insert new user
export async function insertUser({ email, password }): Promise<User> {
    // Use bcrypt lib to hash the password for more security, 10 is the number of salt rounds to make it even more secured
    const hashedPassword = await bcrypt.hash(password, 10);

    const fields = ["email", "password"];
    const values = [email, hashedPassword];

    const connectingElement = values.map(() => "?").join(",");
    const sqlQuery = `
        INSERT INTO user (${fields.join(",")})
        VALUES (${connectingElement})
    `;

    // Insert a new user into user table
    const [result] = await database.query<ResultSetHeader>(sqlQuery, values);

    // Select only the use_id and email of the new user
    const [rows] = await database.query<User[] & RowDataPacket[]>(
        `SELECT user_id, email FROM user WHERE user_id = ?`,
        [result.insertId]
    );

    if (rows.length === 0) {
        throw new Error("Utilisateur inséré mais ne semble pas être trouvé");
    }

    // Returns the new user without the password to the client
    return rows[0];
}

export async function findUser({ email }): Promise<completeUser | null> {
    const [rows] = await database.query<completeUser[] & RowDataPacket[]>(
        `SELECT * FROM user WHERE email = ?`,
        [email]
    );

    if (rows.length === 0) return null;

    return rows[0];
}
