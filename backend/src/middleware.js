import jwt from "jsonwebtoken";
export async function auth(req, res, next) {
  const token = req.cookies.authentication;
  console.log(token);

  if (!token) {
    res.status(401).send("No token provided");
    return;
  }

  try {
    /**
     * @type {import("jsonwebtoken").JwtPayload}}
     */
    // @ts-ignore
    var payload = jwt.verify(token, "cookie");
  } catch (err) {
    console.error(err);
    res.status(401).send("Invalid token");
    return;
  }
  req.userId = payload.sub;
  next();
}
