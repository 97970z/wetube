import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log("Server listening on port http://localhost:4000");

app.listen(PORT, handleListening);
