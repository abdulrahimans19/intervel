import jwt from "jsonwebtoken";

export default function authenticaton(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, "srsrsr", (err, decode) => {
    if (err) {
      return res.send({
        message: "Token not available",
        status: 2,
      });
    }
    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      res.send({
        message: "Token is not valid, please login again",
        status: 2,
      });
    }
  });
}
