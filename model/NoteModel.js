import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      default: "black",
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("note", NoteSchema);
