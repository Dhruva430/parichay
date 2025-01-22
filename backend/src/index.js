// @ts-check
import express from "express";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "./api/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api", apiRouter);
app.listen(5000);
console.log("App is live at http://localhost:5000");
