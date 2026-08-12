import fs from "node:fs/promises";
import path from "node:path";
import { Ticket } from "../types/types.js";

const fileName = path.join(process.cwd(), "src", "Repository", "tickets.json");

export async function readFromFile(file: string = fileName): Promise<Ticket[]> {
  try {
    const content = await fs.readFile(file, "utf-8");
    if (!content.trim()) {
      await writeToFile([]);
      return [];
    }
    const response = JSON.parse(content);
    if (response.tickets) return response.tickets;
    else return [];
  } catch (error: unknown) {
    if (error instanceof Error && error && "code" in error) {
      if (error.code === "ENOENT") {
        console.log("error:", error);
        await writeToFile([]);
        return [];
      }
    }
    throw error;
  }
}

export async function writeToFile(arr: Array<Ticket>, file: string = fileName) {
  try {
    const res = { tickets: arr };
    const stringifiedRes = JSON.stringify(res);
    await fs.writeFile(file, stringifiedRes);
  } catch (error: unknown) {
    throw error;
  }
}

export async function listTickets() {
  try {
    const tickets = await readFromFile();
    return tickets;
  } catch (error: unknown) {
    throw error;
  }
}

export async function addTicket(ticket: Ticket) {
  try {
    const tickets = await readFromFile();
    const updated = [...tickets, ticket];
    await writeToFile(updated);
  } catch (error: unknown) {
    throw error;
  }
}

export async function deleteTicket(id: number) {
  try {
    const tickets = await readFromFile();
    const tickIdx = tickets.findIndex((tck) => tck.id === id);
    if (tickIdx === -1) return false;
    const updated = tickets.filter((tck) => tck.id !== id);
    await writeToFile(updated);
    return true;
  } catch (error: unknown) {
    throw error;
  }
}
