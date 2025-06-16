import type { User } from "../types/users";
import { quicky } from "../instance";

interface getUsersParams {
    authToken: string;
}

export const getUsers = (params: getUsersParams) => {
    quicky.get<User>("/api/users", {
        headers: {
        	'Authorization': `Bearer ${params.authToken}`
    	}
    })
}