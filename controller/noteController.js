import NoteModel from "../model/NoteMOdel.js";
import jwt from "jsonwebtoken";

export const getAllNotes = async (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, "srsrsr", async (err, decode) => {
    try {
      let data = await NoteModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "success",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
};

export const createNotes = async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.send({
      message: "Note created",
      status: 1,
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 0,
    });
  }
};

export const updateNotes = async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note updated",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
};

export const deleteNotes = async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "Note dele ted",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
};
