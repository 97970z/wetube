// express라는 패키지 node_modules에서 찾아서 express란 이름으로 import함
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express(); // express() -> express application 생성
app.use(morgan("dev"));

app.set("view engine", "pug"); // view engine을 pug로 설정
app.set("views", process.cwd() + "/src/views"); // pug의 현재작업디렉토리 기본값 변경
app.use(express.urlencoded({ extended: true })); // express가 form의 value들을 이해할수 있게함
app.use("/", globalRouter);
app.use("/videos", videoRouter); // /videos로 시작하는 url로 접근하면 videoRouter안에 있는 url을 찾아줌
app.use("/users", userRouter);

export default app;
