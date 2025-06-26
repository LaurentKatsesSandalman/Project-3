import database from "../models/db_model";
import { describe, expect, test } from "@jest/globals";
import { getFullForm } from "../services/FullForm";

describe("Integration tests for getFullForm", () => {
    afterAll(async () => {
        await database.end();
    });

    test("should have a return if formId is 1 with proper booleans", async () => {
        const fullForm = await getFullForm(1);
        expect(fullForm).toHaveProperty("form_id", 1);
        expect(fullForm).toHaveProperty("is_deployed", true);
        expect(fullForm).toHaveProperty("is_closed", false);
        expect(fullForm).toHaveProperty("is_public", false);
    });

    test("should have no return if formId is 999", async () => {
        const fullForm = await getFullForm(999);
        expect(fullForm).toBe(null);
    });
});
