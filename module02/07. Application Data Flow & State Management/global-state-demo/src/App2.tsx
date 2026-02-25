import { Link } from "react-router";
import "./App.css";
import { useTheme } from "./context/hooks/use-theme";
import { useCounterStore } from "./libs/zustand/stores/counter.store";

const App2 = () => {
	const { theme, setTheme } = useTheme();
	const { count, increment, decrement } = useCounterStore();
	return (
		<div>
			<div className={`card ${theme === "dark" ? "card-dark" : ""}`}>
				<h1>App 2</h1>
				<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
					Toggle Theme
				</button>
				<button onClick={increment}>count is {count}</button>
				<button onClick={decrement}>decrement</button>
				<Link to="/">Go to App 1</Link>
			</div>
		</div>
	);
};

export default App2;
