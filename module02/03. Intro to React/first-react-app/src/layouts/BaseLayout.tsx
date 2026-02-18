import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const BaseLayout = () => (
	<>
		<Navbar />
		{/*
            Outlet adalah komponen yang diberikan oleh React Router 
            untuk menampilkan komponen halaman yang sesuai dengan rute yang diakses. 
            Dengan menggunakan Outlet, kita dapat membuat layout yang konsisten 
            di seluruh halaman tanpa perlu menambahkan Navbar di setiap halaman secara manual.
            */}
		<Outlet />
	</>
);

export default BaseLayout;
