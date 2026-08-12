import express from "express";
import {
  getTicketDetails,
  enterTicket,
  getSpecificTicketInformation,
  statusUpdateController,
  deleteTicketController,
} from "../Controller/ticketsEndpointHandler.js";

const router = express.Router();

router.get("/", getTicketDetails);
router.post("/", enterTicket);

router.get("/:ticketId", getSpecificTicketInformation);

router.patch("/:ticketId", statusUpdateController);

router.delete("/:ticketId", deleteTicketController);

export default router;
