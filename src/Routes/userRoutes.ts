import express from "express";
import { enterUser } from "../Controller/usersEndpointHandler.js";

const router = express.Router();

router.post("/", enterUser);

export default router;
