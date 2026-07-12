interface AIInsightsCardProps {
  category?: string;
  priority?: string;
  reasoning?: string;
  categoryConfidence?: number;
  priorityConfidence?: number;
}

export function AIInsightsCard({
  category,
  priority,
  reasoning,
  categoryConfidence,
  priorityConfidence,
}: AIInsightsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="mb-4 text-lg font-semibold">
        AI Insights
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Predicted Category
          </p>

          <p className="font-medium">
            {category ?? 'N/A'}
          </p>

          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Confidence:{' '}
            {categoryConfidence
              ? `${(
                  categoryConfidence *
                  100
                ).toFixed(0)}%`
              : 'N/A'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Predicted Priority
          </p>

          <p className="font-medium">
            {priority ?? 'N/A'}
          </p>

          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Confidence:{' '}
            {priorityConfidence
              ? `${(
                  priorityConfidence *
                  100
                ).toFixed(0)}%`
              : 'N/A'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            AI Reasoning
          </p>

          <p>{reasoning ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}