import { RowDataPacket } from "mysql2";

export interface Theme extends RowDataPacket {
    color_value: number;
    font1_size: number;
    font2_size: number;
    font1_value: string;
    font2_value: string;
}
