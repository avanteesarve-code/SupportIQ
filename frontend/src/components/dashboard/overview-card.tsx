import { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface OverviewCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  trend?: string;
}

export function OverviewCard({
  title,
  value,
  icon,
  trend,
}: OverviewCardProps) {
  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        border
        border-border/50
        bg-background/80
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2a9d8f] to-cyan-500" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>

          {trend && (
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={12} />
              {trend}
            </div>
          )}
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-[#2a9d8f]/10
            text-[#2a9d8f]
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <h2 className="text-4xl font-bold tracking-tight">
          {value}
        </h2>
      </CardContent>
    </Card>
  );
}