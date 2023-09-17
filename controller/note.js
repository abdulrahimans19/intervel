import db from "../db.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const getAllNotes = (req, res) => {
  const userId = req.user.id;
  db.query(
    "SELECT * FROM notes WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching notes: " + err);
        res.status(500).json({ error: "Failed to fetch notes" });
        return;
      }
      res.json(results);
    }
  );
};

export const getNotes = (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  db.query(
    "SELECT * FROM notes WHERE id = ? AND user_id = ?",
    [noteId, userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching note: " + err);
        res.status(500).json({ error: "Failed to fetch note" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Note not found" });
        return;
      }
      res.json(results[0]);
    }
  );
};

export const createNotes = [
  upload.single("image"),
  (req, res) => {
    const userId = req.user.id;
    const { heading, description, date, time, priority } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const query =
      "INSERT INTO notes (user_id, heading, description, date, time, priority, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [userId, heading, description, date, time, priority, imagePath],
      (err, result) => {
        if (err) {
          console.error("Error adding note: " + err);
          res.status(500).json({ error: "Failed to add note" });
          return;
        }
        res.json({ message: "Note added successfully" });
      }
    );
  },
];

export const updateNotes = [
  upload.single("image"),
  (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;
    const { heading, description, date, time, priority } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const query =
      "UPDATE notes SET heading = ?, description = ?, date = ?, time = ?, priority = ?, image_path = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?";
    db.query(
      query,
      [heading, description, date, time, priority, imagePath, noteId, userId],
      (err, result) => {
        if (err) {
          console.error("Error updating note: " + err);
          res.status(500).json({ error: "Failed to update note" });
          return;
        }
        res.json({ message: "Note updated successfully" });
      }
    );
  },
];

export const deleteNotes = (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;
  db.query(
    "DELETE FROM notes WHERE id = ? AND user_id = ?",
    [noteId, userId],
    (err, result) => {
      if (err) {
        console.error("Error deleting note: " + err);
        res.status(500).json({ error: "Failed to delete note" });
        return;
      }
      res.json({ message: "Note deleted successfully" });
    }
  );
};
