import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, required: true, default: Date.now },
  // 댓글 좋아요
  likes: [{ type: Number, default: 0 }],
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
