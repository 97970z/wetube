// express라는 패키지 node_modules에서 찾아서 express란 이름으로 import함
import express from "express";

const PORT = 4000;

const app = express(); // express() -> express application 생성

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const handleHome = (req, res, next) => {
  return res.send("i love middleware"); // request 종료
};

app.get("/", logger, handleHome);

const handleListening = () =>
  console.log("Server listening on port http://localhost:4000");

app.listen(PORT, handleListening);
