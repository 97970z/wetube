// express라는 패키지 node_modules에서 찾아서 express란 이름으로 import함
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express(); // express() -> express application 생성
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/videos", videoRouter); // /videos로 시작하는 url로 접근하면 videoRouter안에 있는 url을 찾아줌
app.use("/users", userRouter);

const handleListening = () =>
  console.log("Server listening on port http://localhost:4000");

app.listen(PORT, handleListening);
