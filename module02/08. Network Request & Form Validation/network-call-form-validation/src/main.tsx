import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import CreatePostPage from "./pages/create-post.page.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />
				<Route path="/create-post" element={<CreatePostPage />} />
				<Route
					path="*"
					element={
						<div className="mx-auto container flex items-center justify-center">
							404 Not Found
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
