import express, { Router } from "express";
import userResource from "../resources/user.resource.js";
import postResource from "../resources/post.resource.js";
import authResource from "../resources/auth.resource.js";

const apiRouter: Router = express.Router();

// Welcome route for API root
apiRouter.get("/", (_req, res) => {
	res.send({ message: "Welcome to ORM Integrated App API" });
});

// Suffix resource itu style preference ya
// Misal mau jadi authRouter, postRouter, userRouter dan ga dipisah di folder resources juga ga apa2, yang penting konsisten aja
// Resource itu istilah yang sering dipakai untuk menyebut kumpulan route yang berkaitan dengan satu entitas di MVC,
// misal userResource itu kumpulan route yang berkaitan dengan user.

apiRouter.use("/auth", authResource);
apiRouter.use("/posts", postResource);
apiRouter.use("/users", userResource);

// Ke depannya kalau api ini ada update menjadi v2 misalnya
// tinggal buat file api.v2.router.ts di folder router, terus ikutin format yang di sini aja.
// app.use("/api/v2", apiRouterV2); misalnya untuk memastikan aplikasi express ini
// memakai versi API yang benar sesuai kebutuhan client-nya.

export default apiRouter;
