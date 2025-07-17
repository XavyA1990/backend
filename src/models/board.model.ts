import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

boardSchema.pre("validate", function (next) {
  const board = this as any;

  if (board.members.includes(board.owner)) {
    return next(new Error("Member cannot be the same as the owner"));
  }

  const uniqueMembers = new Set(
    board.members.map((member: any) => member.toString())
  );

  if (uniqueMembers.size !== board.members.length) {
    return next(new Error("Members must be unique"));
  }
  next();
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
