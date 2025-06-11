//Typing for user

export interface User {
    user_id: number;
    email: string;
}

export interface NewUserInput {
    email: string;
    password: string;
}
