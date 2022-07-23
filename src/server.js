// express라는 패키지 node_modules에서 찾아서 express란 이름으로 import함
// WWGqXcNOm8PhmWsJ
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import helmet from "helmet";
import flash from "express-flash";
import { localsMiddleware } from "./middlewares";

const app = express(); // express() -> express application 생성
app.use(morgan("dev"));

app.set("view engine", "pug"); // view engine을 pug로 설정
app.set("views", process.cwd() + "/src/views"); // pug의 현재작업디렉토리 기본값 변경
app.use(express.urlencoded({ extended: true })); // express가 form의 value들을 이해할수 있게함
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter); // /videos로 시작하는 url로 접근하면 videoRouter안에 있는 url을 찾아줌
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
