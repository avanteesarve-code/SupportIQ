export interface DashboardOverview {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  urgentTickets: number;
  totalAgents: number;
  averageTicketsPerAgent: number;
}

export interface AgentWorkload {
  agentId: string;
  agentName: string;
  openTickets: number;
  inProgressTickets: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
}