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

/*
	Aplikasi berikut sudah lengkap implementasi authentication dengan Backendless menggunakan Backendless SDK.
	Untuk konfigurasi Backendless SDK ada di file src/lib/backendless/backendless.config.ts,
	di mana kita inisialisasi Backendless dengan appId dan JS apiKey dari aplikasi Backendless kita.
	Backendless SDK bisa juga dipakai untuk akses data tanpa axios. Silahkan dicoba eksperimen dengan membaca Docs-nya ya.

	Implementasi auth di sini sudah terhitung lengkap secara front end. Kalian bisa pakai ulang di projek kalian bila diperlukan.
	Guide:
	- Cukup pastikan setiap page baru bisa dibedakan ya yang mana yang untuk Guest, Public, atau Private lalu dikondisikan peletakannya di dalam GuestRoutesProtection, AuthRoutesProtection, atau di luar keduanya.
	- Contoh di sini sangat simpel di mana data user yang disimpan di zustand hanyalah email. Kalian bisa pake type Backendless.User yang sudah disediakan oleh Backendless SDK untuk menyimpan data user yang lebih lengkap, seperti name, id, dll.
	
	Implementasi auth di sini cukup untuk projek simple seperti company profile kalian.
*/

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
