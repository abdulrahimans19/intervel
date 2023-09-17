import jwt from "jsonwebtoken";

const secretKey = "srsrsr";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); 
  return token;
};

export const authentication = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated!" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid!" });
    }
    req.user = decoded;
    next();
  });
};
