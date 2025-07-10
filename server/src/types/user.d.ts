//Typing for user

export interface User {
    user_id: number;
    email: string;
}

export interface UserInput {
    email: string;
    password: string;
}

export interface completeUser {
    user_id: number;
    email: string;
    password: string;
}
