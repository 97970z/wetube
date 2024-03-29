import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
  likeComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
// apiRouter.post("/comments/:id([0-9a-f]{24})/like", likeComment);
apiRouter.delete("/comments/:id([0-9a-f]{24})", deleteComment);

export default apiRouter;
