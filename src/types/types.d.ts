export type StatusType = "Pending" | "Completed";
export type priorityType = "Low" | "Medium" | "High";
export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: priorityType;
  status: StatusType;
  assignee?: string;
}

export interface TicketInput {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
}

export interface User {
  name: string;
  email: string;
}
