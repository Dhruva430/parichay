// @ts-check
import { z } from "zod";
import pool from "../db.js";
import { SignupSchema, SigninSchema } from "../types.js";
import { Router } from "express";
import jwt from "jsonwebtoken";

export const router = Router();
router.post(`/signup`, async (req, res) => {
  console.log(`hello`);
  const data = SignupSchema.safeParse(req.body);
  if (!data.success) {
    res.send(`invalid Data`);
    return;
  }
  try {
    await pool.query(
      `insert into users(username,email,first_name,last_name,password) values($1,$2,$3,$4,$5)`,
      [
        data.data.username,
        data.data.email,
        data.data.first_name,
        data.data.last_name,
        data.data.password,
      ]
    );
    res.json({});
  } catch (e) {
    console.error(e);
    if (e.code === "23505") {
      res.status(400).json({ message: `User already exist` });
    } else if (e instanceof z.ZodError) {
      res.status(400).json({ error: e.errors });
    } else {
      res.status(500).json({ message: `signup failed` });
    }
  }
});

router.post("/signin", async (req, res) => {
  const parsed = SigninSchema.safeParse(req.body);
  if (!parsed.success) {
    res.send("Bhul gaye password");
    return;
  }
  const data = parsed.data;
  const result = await pool.query(`select * from users where username = $1`, [
    parsed.data.username,
  ]);
  const user = result.rows[0];

  if (!user || user.password != data.password) {
    res.send("invalid credentials");
    return;
  }
  const token = jwt.sign({}, "muffin", {
    expiresIn: 10 * 60,
    subject: user.id,
  });
  res.cookie("authentication", token, {
    httpOnly: true,
    // maxAge: 60 * 3,
  });
  res.send("signin successful");
  return;
});

router.get(`/user`, async (req, res) => {
  const payload = jwt.verify(req.cookies.authentication, "muffin");
  res.json(payload);
});
