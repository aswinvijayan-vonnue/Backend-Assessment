export interface Ticket{
    id:number;
    title:string;
    description:string;
    priority:'Low'|'Medium'|'High';
    status:'Pending'|'Completed';
    assignee?:string;
}

export interface TicketInput{
    title:string;
    description:string;
    priority:'Low'|'Medium'|'High';
    status:'Pending'|'Completed';
    
}