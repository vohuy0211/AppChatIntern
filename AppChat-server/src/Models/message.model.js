import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema)