import axios from "axios";

export const quicky = axios.create({
    baseURL: "https://localhost:3000",
    headers: {
        "Accept": "application/json",
        // "Authorization": "Bearer " + import.meta.env.VITE_TMDB_TOKEN
    }
});