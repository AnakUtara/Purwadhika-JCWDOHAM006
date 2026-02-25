initBackendless();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import LoginPage from "./pages/login.page.tsx";
import { Toaster } from "sonner";
import GuestRoutesProtection from "./components/providers/guest.routes.protection.tsx";
import AuthRoutesProtection from "./components/providers/auth.routes.protection.tsx";
import AuthProvider from "./components/providers/auth.provider.tsx";
import { initBackendless } from "./lib/backendless/backendless.config.ts";
import RegisterPage from "./pages/register.page.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster />
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<GuestRoutesProtection />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
					</Route>
					<Route element={<AuthRoutesProtection />}>
						<Route path="/" element={<App />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>,
);
