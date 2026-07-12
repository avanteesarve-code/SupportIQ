import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OverviewCardProps {
  title: string;
  value: number;
}

export function OverviewCard({
  title,
  value,
}: OverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-gray-600 dark:text-zinc-400">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}