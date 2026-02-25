import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme.context.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import App2 from "./App2.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/2" element={<App2 />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
);
