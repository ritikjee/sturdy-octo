import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { internshipData } from "./data/internship-data";
import { connectDb } from "./db/connectDb";
import auth from "./route/auth.route";

dotenv.config();

const PORT: string | number = process.env.PORT || 8080;

const app: Express = express();
connectDb();

app.use(cors());
app.use(express.json());

app.get("/api/internships", (req, res) => {
  res.send(internshipData);
});

app.use("/api", auth);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
