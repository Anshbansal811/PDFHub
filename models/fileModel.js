import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    Pdf: {
      data: Buffer,
      contentType: String,
    },
    Userdescription: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("file", fileSchema);