import { useEffect, useState } from "react";
import api from "./libs/axios";

function App() {
	const [count, setCount] = useState(0);
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const [error, setError] = useState("");

	const getWelcomeMessage = async () => {
		try {
			const res = await api.get("/");
			setWelcomeMessage(res.data.message);
		} catch (e) {
			console.error(e);
			setError("Failed to fetch welcome message");
		}
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getWelcomeMessage();
	}, []);

	return (
		<div className="container mx-auto">
			<section>
				<div>
					<h1>{welcomeMessage || error}</h1>
					<p>
						Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
					</p>
				</div>
				<button
					className="counter"
					onClick={() => setCount((count) => count + 1)}
				>
					Count is {count}
				</button>
			</section>
		</div>
	);
}

export default App;
