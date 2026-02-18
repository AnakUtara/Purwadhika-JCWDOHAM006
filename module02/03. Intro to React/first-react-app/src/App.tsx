import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage";
import CounterButton from "./components/CounterButton";

function App() {
	// useState adalah hook/fungsi yang diberikan React
	// untuk menambahkan state (data yang dapat berubah) di dalam komponen fungsional.
	// argumen akan menjadi nilai awal dari state
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<WelcomeMessage name="John Doe" message="Welcome to our website!" />
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<CounterButton mode="add" onCountChange={setCount} count={count} />
				<CounterButton mode="subtract" onCountChange={setCount} count={count} />
				<p
					// Inline style demo
					style={{
						fontSize: "48px",
					}}
				>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
