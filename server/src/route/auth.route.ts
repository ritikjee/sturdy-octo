import { Router } from "express";

import { verify, login } from "../controllers/auth.controller";

const auth = Router();

auth.post("/auth", login);
auth.post("/verify", verify);

export default auth;
