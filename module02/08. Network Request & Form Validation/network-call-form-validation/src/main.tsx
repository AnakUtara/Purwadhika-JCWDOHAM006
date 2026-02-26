import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import CreatePostPage from "./pages/create-post.page.tsx";
import { Toaster } from "sonner";
import EditPostPage from "./pages/edit-post.page.tsx";
import PostDetailPage from "./pages/post-detail.page.tsx";

/* 
	Aplikasi berikut sudah lengkap implementasi CRUD(Create, Read, Update, Delete) dengan network request ke API menggunakan axios, 
	serta form validation menggunakan Formik & Yup.:
	- Create: Halaman CreatePostPage dengan form untuk membuat post baru, yang akan mengirim data ke API menggunakan method POST.
	- Read: Halaman utama App yang menampilkan daftar post dengan data yang diambil dari API menggunakan method GET, dan halaman PostDetailPage untuk melihat detail post tertentu.
	- Update: Halaman EditPostPage dengan form yang sudah terisi data post yang mau di edit, yang akan mengirim data ke API menggunakan method PUT untuk update post.
	- Delete: Tombol delete di setiap card post yang akan mengirim request ke API menggunakan method DELETE untuk hapus post.

	Selain itu juga sudah dilengkapi dengan loading state, error handling, dan optimasi UI seperti disabled button saat submit, dan feedback menggunakan toast.

	Backend menggunakan Backendless sehingga data dipastikan sudah persisten, jadi nanti kalian bisa bikin aplikasi Backendless Fullstack kalian sendiri,
	dan menggunakan projek ini sebagai referensi implementasinya.
*/

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster richColors />
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />
				<Route path="/create-post" element={<CreatePostPage />} />
				{/* 
					Berikut deklarasi rute menggunakan route params untuk page details/edit menggunakan :id.
					: di depan id menandakan bahwa itu adalah route param, yang berarti nilainya akan dinamis sesuai dengan id post yang diklik oleh user.
					Contohnya ketika user klik post dengan id 123, maka dia akan diarahkan ke route /posts/123 untuk melihat detailsnya, atau /posts/123/edit untuk mengedit post tersebut.
				*/}
				<Route path="/posts/:id" element={<PostDetailPage />} />
				<Route path="/posts/:id/edit" element={<EditPostPage />} />
				{/* Catch-all route untuk halaman yang tidak ditemukan. Biasa untuk 404 page */}
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
