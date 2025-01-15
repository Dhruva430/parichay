// @ts-check
import express from "express";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "./api/index.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
  res.send("Check your console for cookies!");
});

app.get("/cookie", (req, res) => {
  const cookieName = "muffin";
  const cookieValue = 10;
  const minute = 60 * 1000;

  res.cookie(cookieName, cookieValue, { maxAge: minute });
  res.send("Cookie has been set!");
  return;
});
// res.cookie(cookie_name, "cookie_value", { expire: 24 * 60 * 60 * 1000 });
// res.cookie(cookie_name , 'cookie_value', { secure: true});
app.listen(5000);
console.log("App is live at http://localhost:5000");
