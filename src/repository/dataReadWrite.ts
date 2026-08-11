import fs from "node:fs/promises";
import path from "node:path";
import { Ticket } from "../types/types.js";

const fileName = path.join(process.cwd(), "src", "repository", "tickets.json");

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
