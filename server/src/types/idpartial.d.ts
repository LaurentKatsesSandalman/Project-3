import { RowDataPacket } from "mysql2";

export interface IdPartial extends RowDataPacket{
    id:number
}