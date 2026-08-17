import { User } from "../types/types.js";
import { addUser } from "../Repository/dataReadWrite.js";
import { ValidationError } from "./ticketServices.js";

export async function postUser(user: User) {
  try {
    const isValid = validateUser(user);
    if (!isValid) throw new ValidationError("Invalid ticket entry", 422);
    await addUser(user);
  } catch (err: unknown) {
    throw err;
  }
}

function validateUser(userData: unknown) {
  if (typeof userData !== "object" || !userData) return false;
  const userInfo = userData as Record<string, unknown>;
  return (
    typeof userInfo.name === "string" &&
    userInfo.name.length > 0 &&
    typeof userInfo.email === "string" &&
    userInfo.email.length > 0 &&
    validateEmail(userInfo.email)
  );
}

function validateEmail(email: string) {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(email);
}
