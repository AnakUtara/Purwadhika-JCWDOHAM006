import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useTheme } from "./context/hooks/use-theme";
import { useCounterStore } from "./libs/zustand/stores/counter.store";
import { Link } from "react-router";

function App() {
	const { count, increment, decrement } = useCounterStore();
	const { setTheme, theme } = useTheme();

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className={`card ${theme === "dark" ? "card-dark" : ""}`}>
				<button onClick={increment}>count is {count}</button>
				<button onClick={decrement}>decrement</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
					Toggle Theme
				</button>
				<p className="read-the-docs">
					Click on the Vite and React logos to learn more
				</p>
				<Link to="/2">Go to App 2</Link>
			</div>
		</>
	);
}

export default App;
