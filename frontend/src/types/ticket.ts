export interface Ticket {
  id: string;
  subject: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string;

customerName?: string;
customerEmail?: string;

  category?: {
    id: string;
    name: string;
  };

  priority?: {
    id: string;
    label: string;
  };

  assignedAgent?: {
    id: string;
    name: string;
    email: string;
  };
}