import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AboutUs from "./pages/AboutUs.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			{/*
        BrowserRouter digunakan untuk menginisialisasi routing/halaman di aplikasi React.
			 */}
			<Routes>
				{/* 
          Definisikan rute di bawah ini.
          Layout adalah komponen yang akan digunakan untuk membungkus semua halaman, sehingga kita tidak perlu menambahkan Navbar di setiap halaman.
        */}
				<Route element={<BaseLayout />}>
					{/*  
          Route dengan prop "index" akan menjadi halaman default yang ditampilkan ketika pengguna mengakses root path ("/").
          Element prop akan menentukan komponen mana yang akan dirender ketika rute tersebut diakses. Dalam hal ini, kita merender komponen App untuk root path dan AboutUs untuk path "/about-us".
          */}
					<Route index element={<App />} />
					<Route path="/about-us" element={<AboutUs />} />
					{
						// Tambahkan rute lain di sini jika diperlukan
					}
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
