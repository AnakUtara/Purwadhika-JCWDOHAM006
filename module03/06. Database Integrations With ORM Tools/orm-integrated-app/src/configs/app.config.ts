import express, { type Application } from "express";

// Semua konfigurasi Express.js dilakukan di sini

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
