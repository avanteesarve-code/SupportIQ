export interface TicketActivity {
  id: string;
  ticketId: string;
  actorType: 'SYSTEM' | 'AI' | 'AGENT';
  actorId: string | null;
  action: string;
  detail: Record<string, unknown> | null;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  customerName?: string;
  customerEmail?: string;

  aiConfidenceCategory?: number;
  aiConfidencePriority?: number;

  aiResponses?: {
    id: string;
    generatedText: string;
    confidenceScore: number;
    status: string;
  }[];

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

  activities?: TicketActivity[];
}