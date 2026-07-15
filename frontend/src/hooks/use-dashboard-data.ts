'use client';

import { useEffect, useState } from 'react';

import {
  getAgentWorkloads,
  getCategoryDistribution,
  getDashboardOverview,
} from '@/services/dashboard.service';
import type {
  AgentWorkload,
  CategoryDistribution,
  DashboardOverview,
} from '@/types/dashboard';

export function useDashboardData() {
  const [overview, setOverview] =
    useState<DashboardOverview | null>(null);

  const [workloads, setWorkloads] =
    useState<AgentWorkload[]>([]);

  const [categoryData, setCategoryData] =
    useState<CategoryDistribution[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const overviewData =
          await getDashboardOverview();

        const workloadData =
          await getAgentWorkloads();

        const categoryDistribution =
          await getCategoryDistribution();

        setOverview(overviewData);
        setWorkloads(workloadData);
        setCategoryData(categoryDistribution);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  return {
    overview,
    workloads,
    categoryData,
    loading,
  };
}