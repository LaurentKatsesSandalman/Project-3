import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "./../src/app";

describe("Integraton tests for /users API", () => {
    test("Should create a new user and return it", async () => {
        const newUser = {
            email: "bobiiiilililii@bob.com",
            password: "123456789",
        };

        const response = await request(app).post("/api/users").send(newUser);

        expect(response.status).toBe(201);
    });
});
