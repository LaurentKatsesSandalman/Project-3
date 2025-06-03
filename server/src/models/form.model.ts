import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Form } from "../types/form";
import { IdPartial } from "../types/idpartial";
import { Field, FieldOption } from "../types/field";

export async function findAllForms(user_id:number): Promise<Form[]> {

    const [rows] = await database.query<Form[]>(`SELECT * FROM form WHERE user_id=?`,[user_id]);

    return rows;
}


export async function findAllFieldsId (form_id:number): Promise<IdPartial[]>{
    const [rows] = await database.query<IdPartial[]>(`SELECT id FROM field WHERE form_id=?`,[form_id]);
    return rows;
}

export async function findAllOptionsIds(array:number[]): Promise<IdPartial[]>{
    const [rows] = await database.query<IdPartial[]>(`SELECT id FROM field_option WHERE field_id IN ?`,[array]);
    return rows;
}

export async function findFormById(id: number): Promise<Form | undefined> {
    const fields= await findAllFieldsId(id);
    const fieldsId:number[]=[]
    for (const field  of fields ){fieldsId.push(field.id)}
    const fieldsOptions = await findAllOptionsIds(fieldsId)

    //ARRET ICI, SAVE DU SOIR
    
    // const [rows] = await database.query<Form[] & RowDataPacket[]>(`SELECT * FROM form WHERE id=?`, [id]);
    // return rows[0];
}
