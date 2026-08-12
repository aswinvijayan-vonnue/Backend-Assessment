import request from "supertest";
import app from "../app.js";
import { type Ticket } from "../types/types.js";
import { ValidationError, NotFoundError } from "../Services/ticketServices.js";

import * as ticketService from "../Services/ticketServices.js";

afterEach(() => {
  jest.restoreAllMocks();
});
describe("Testing get methods", () => {
  test("Testing getAll endpoint", async () => {
    jest
      .spyOn(ticketService, "getAllTicket")
      .mockImplementation(async () => []);
    const res = await request(app).get("/ticket");
    expect(res.status).toBe(200);
  });
  test("Testing get with specific id in successCase", async () => {
    const data: Ticket = {
      id: 1786511561054,
      title: "Server not found",
      description: "Network lag",
      priority: "Medium",
      status: "Completed",
      assignee: "Sheethal",
    };
    jest.spyOn(ticketService, "viewSpecificTicket").mockResolvedValue(data);
    const res = await request(app).get("/ticket/1786511561054");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
  });
  test("Testing get with specific id in failure case", async () => {
    const res = await request(app).get("/ticket/200");
    console.log("gottt", res.body);
    expect(res.status).toBe(404);
  });
});

describe("Testing post methods", () => {
  test("Testing creating ticket method in success case", async () => {
    jest.spyOn(ticketService, "postTicket").mockImplementation(async () => {});
    const data = {
      title: "Incorrect password",
      description:
        "Cant get access to the system even entered correct password",
      priority: "High",
      status: "Pending",
    };
    const res = await request(app).post("/ticket").send(data);
    expect(res.status).toBe(201);
  });
  test("Testing creating ticket method in failure case", async () => {
    jest
      .spyOn(ticketService, "postTicket")
      .mockRejectedValue(new ValidationError("Invalid ticket", 422));
    const data = {
      title: "Incorrect password",
      description:
        "Cant get access to the system even entered correct password",
      priority: "High",
      status: "IDK",
    };
    const res = await request(app).post("/ticket").send(data);
    expect(res.status).toBe(422);
  });
});

describe("Testing all patch methods", () => {
  test("testing status update in success case", async () => {
    const statusSpy = jest
      .spyOn(ticketService, "updateStatus")
      .mockImplementation(async () => {});
    const assigneeSpy = jest
      .spyOn(ticketService, "assignTicket")
      .mockImplementation(async () => {});
    const response = await request(app)
      .patch("/ticket/1786511561054")
      .send({ status: "pending" });
    expect(response.status).toBe(200);
    expect(statusSpy).toHaveBeenCalledTimes(1);
    expect(statusSpy).toHaveBeenCalledWith(1786511561054, "pending");
    expect(assigneeSpy).not.toHaveBeenCalled();
  });
  test("testing status update in validation error case", async () => {
    const statusSpy = jest
      .spyOn(ticketService, "updateStatus")
      .mockRejectedValue(new ValidationError("Invalid status value", 422));
    const response = await request(app)
      .patch("/ticket/1786511561054")
      .send({ status: "isk" });
    expect(response.status).toBe(422);
  });

  test("testing assignee update in success case", async () => {
    const statusSpy = jest
      .spyOn(ticketService, "updateStatus")
      .mockImplementation(async () => {});
    const assigneeSpy = jest
      .spyOn(ticketService, "assignTicket")
      .mockImplementation(async () => {});
    const response = await request(app)
      .patch("/ticket/1786511561054")
      .send({ assignee: "abcd" });
    expect(response.status).toBe(200);
    expect(assigneeSpy).toHaveBeenCalledTimes(1);
    expect(assigneeSpy).toHaveBeenCalledWith(1786511561054, "abcd");
    expect(statusSpy).not.toHaveBeenCalled();
  });
  test("testing status update in validation error case", async () => {
    jest
      .spyOn(ticketService, "assignTicket")
      .mockRejectedValue(new NotFoundError("Not found", 422));
    const response = await request(app)
      .patch("/ticket/1786511561054")
      .send({ assignee: "isk" });
    expect(response.status).toBe(422);
  });
});
