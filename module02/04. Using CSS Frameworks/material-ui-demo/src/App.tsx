import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Stack, Typography } from "@mui/material";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Stack direction={"row"} gap={4}>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</Stack>
			<Typography variant="h1">Vite + React</Typography>
			<div className="card">
				<Button
					variant="contained"
					onClick={() => setCount((count) => count + 1)}
					sx={{
						backgroundColor: "white",
						borderRadius: "50%",
						color: "black",
						"&:hover": {
							bgcolor: "black",
							color: "white",
						},
					}}
				>
					count is {count}
				</Button>
				<Typography variant="body1">
					Edit <code>src/App.tsx</code> and save to test HMR
				</Typography>
			</div>
			<Typography variant="body1" className="read-the-docs">
				Click on the Vite and React logos to learn more
			</Typography>
		</>
	);
}

export default App;
