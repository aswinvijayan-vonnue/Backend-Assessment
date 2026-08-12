import express from "express";
import {
  getTicketDetails,
  enterTicket,
} from "../Controller/ticketsEndpointHandler.js";

const router = express.Router();

router.get("/", getTicketDetails);
router.post("/", enterTicket);

export default router;
