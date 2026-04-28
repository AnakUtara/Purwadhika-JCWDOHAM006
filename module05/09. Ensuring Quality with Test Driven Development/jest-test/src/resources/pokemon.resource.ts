import { Router } from "express";

const pokemonRouter = Router();

pokemonRouter.get("/", async (_req, res) => {
	try {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon");
		const data = await response.json();

		res.send({ message: "Get all pokemons", data: data.results });
	} catch (error) {
		console.error("Error fetching pokemons:", error);
		res.status(500).send({ message: "Failed to fetch pokemons" });
	}
});

export default pokemonRouter;
