import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import filmsRouter from "./films.js";
import usersRouter from "./users.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
  });
}); */

app.use("/films", filmsRouter);
app.use("/users", usersRouter);

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log("reviews api listening on 5555");
});
