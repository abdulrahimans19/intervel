import express from "express";
import { authentication } from "../middileware/auth.js";
import {
  createNotes,
  deleteNotes,
  getNotes,
  getAllNotes,
  updateNotes,
} from "../controller/note.js";

const router = express.Router();
router.use(authentication);

router.get("/lists", getAllNotes);
router.post("/create", createNotes);
router.patch("/update/:id", updateNotes);
router.get("/lists/:id", getNotes);
router.delete("/delete/:id", deleteNotes);

export default router;
