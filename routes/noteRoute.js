import express from "express";
import authenticaton from "../middileware/authentication.js";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  updateNotes,
} from "../controller/noteController.js";

const router = express.Router();
router.use(authenticaton);

router.get("/lists", getAllNotes);
router.post("/create", createNotes);
router.patch("/update", updateNotes);
router.delete("/delete", deleteNotes);

export default router;
