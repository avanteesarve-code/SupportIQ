export const supportedTicketCategories = [
  'Technical Support',
  'Billing',
  'Feature Request',
  'Bug Report',
  'General Inquiry',
] as const;

export const supportedTicketPriorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;

export type SupportedTicketCategory = (typeof supportedTicketCategories)[number];
export type SupportedTicketPriority = (typeof supportedTicketPriorities)[number];

export interface TicketClassificationInput {
  subject: string;
  body: string;
}

export interface TicketClassificationResult {
  category: SupportedTicketCategory;
  priority: SupportedTicketPriority;
  confidenceCategory?: number;
  confidencePriority?: number;
  reason?: string;
  prompt: string;
  response: string;
  usedFallback: boolean;
}

export interface TicketAnalysisInput {
  subject: string;
  body: string;
}

export interface TicketAnalysisResult {
  summary: string;
  recommendedAction: string;
}
export interface TicketReplySuggestionResult {
  suggestedReply: string;
  knowledgeSources: string[];
}