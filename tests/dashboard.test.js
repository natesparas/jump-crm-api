const request = require("supertest");
const app = require('../app');

// Worrk in progress
describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/api/dashboard/getTotalSales");
        expect(response.statusCode).toBe(200);
    });
});