import request from "supertest";
import { app } from "../src/index"; // Import your Express app instance
import { APP_NAME } from "../src/config/app.config";

describe("GET /", () => {
	it("should return 200 and a welcome message", async () => {
		// Use supertest to make a GET request to your app instance
		const response = await request(app).get("/api/");
		console.log(response.body);

		// Assertions
		expect(response.status).toBe(200);
		expect(response.text).toBe<string>(`Welcome to the ${APP_NAME} API`);
	});

	// Example of a test that fails (just for demonstration)
	it("should not return a 404 for the root path", async () => {
		const response = await request(app).get("/api/");
		expect(response.status).not.toBe(404);
	});
});
