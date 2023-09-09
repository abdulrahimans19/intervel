import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../model/UserModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use", status: 0 });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ message: "User has been created", status: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message, status: 0 });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn: "10m",
  };
  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id }, "srsrsr", option);
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({
            message: "something went wrong:" + err,
            status: 0,
          });
        if (result) {
          res.send({
            message: "user logged in",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "incorect password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "user does not excist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
};
