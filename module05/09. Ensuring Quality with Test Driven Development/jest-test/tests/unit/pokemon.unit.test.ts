import app from "../../src/app.js";
import request from "supertest";
import nock from "nock";

describe("GET /pokemons", () => {
	it("should return an array of pokemons", async () => {
		const mockData = {
			results: [
				{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
				{ name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
			],
		};

		nock("https://pokeapi.co").get("/api/v2/pokemon").reply(200, mockData);

		const res = await request(app).get("/pokemons");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			message: "Get all pokemons",
			data: mockData.results,
		});
	});

	it("should return 500 when external API fails", async () => {
		nock("https://pokeapi.co")
			.get("/api/v2/pokemon")
			.replyWithError("API failure");

		const res = await request(app).get("/pokemons");
		expect(res.statusCode).toEqual(500);
		expect(res.body).toEqual({
			message: "Failed to fetch pokemons",
		});
	});
});
