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
    <div className="rounded-lg border p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        AI Insights
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">
            Predicted Category
          </p>

          <p className="font-medium">
            {category ?? 'N/A'}
          </p>

          <p className="text-sm text-gray-500">
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
          <p className="text-sm text-gray-500">
            Predicted Priority
          </p>

          <p className="font-medium">
            {priority ?? 'N/A'}
          </p>

          <p className="text-sm text-gray-500">
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
          <p className="text-sm text-gray-500">
            AI Reasoning
          </p>

          <p>{reasoning ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}