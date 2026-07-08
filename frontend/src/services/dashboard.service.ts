import { api } from '@/lib/api';
import type {
  AgentWorkload,
  CategoryDistribution,
  DashboardOverview,
} from '@/types/dashboard';

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const response = await api.get('/dashboard/overview');
  return response.data.data;
}

export async function getAgentWorkloads(): Promise<AgentWorkload[]> {
  const response = await api.get('/dashboard/workloads');
  return response.data.data;
}

export async function getCategoryDistribution(): Promise<
  CategoryDistribution[]
> {
  const response = await api.get('/dashboard/category-distribution');
  return response.data.data;
}