import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../db.js";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR name = ?";

  UserModel.query(q, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`name`,`email`,`password`) VALUES (?)";
    const values = [req.body.name, req.body.email, hash];

    UserModel.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  let option = { expiresIn: "10m" };
  UserModel.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    
      const token = jwt.sign({ id: data[0].id }, "srsrsr",option);
      const { password, ...other } = data[0];
    console.log(token)

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
