// @ts-check
import { z } from "zod";
import pool from "../db.js";
import { SignupSchema, SigninSchema } from "../types.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../middleware.js";
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
  const token = jwt.sign({}, "cookie", {
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
  const payload = jwt.verify(req.cookies.authentication, "cookie");
  res.json(payload);
});

router.post(`/post`, auth, async (req, res) => {
  const { content, title } = req.body;

  if (!content || !title) {
    res.status(400).send("Content and title are required");
    return;
  }

  try {
    const response = await pool.query(
      `INSERT INTO posts (user_id, content, title) VALUES($1, $2, $3) RETURNING *`,
      [req.userId, content, title]
    );
    res.json({ message: "Post created successfully!", post: response.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create post");
  }
});
router.post(`/post/:postId/likes`, auth, async (req, res) => {
  try {
    await pool.query(`INSERT INTO likes {user_id,post_id} VALUE($1,$2)`, [
      req.userId,
      req.params.postId,
      res.json({ message: `post liked` }),
    ]);
  } catch (err) {
    res.send(`error occured`);
  }
});
router.post(`/post/:postId/unlikes`, auth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM likes WHERE userId =$1 and postId= $2`, [
      req.userId,
      req.params.postId,
    ]);
    res.json({ message: `post disliked` });
  } catch (err) {
    res.send(`error occured in post section`);
  }
});

router.post(`/post/:postId/comments`, auth, async (req, res) => {
  console.log(`Yo`);
  const { content } = req.body;
  if (!content) {
    return;
  }
  try {
    console.log(`Yo`);
    const result = await pool.query(
      `INSERT INTO comments (post_id,user_id,content) VALUES($1,$2,$3)`,
      [req.params.postId, req.userId, content]
    );
    res.json({
      message: `comment added successfully`,
      comment: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.send(`error in comment section`);
  }
});
