import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT: string | number = process.env.PORT || 8080;

const app: Express = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
