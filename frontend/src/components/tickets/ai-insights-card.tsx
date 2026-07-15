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
  const categoryPercent = categoryConfidence
    ? Math.round(categoryConfidence * 100)
    : 0;

  const priorityPercent = priorityConfidence
    ? Math.round(priorityConfidence * 100)
    : 0;

  return (
    <div className="rounded-2xl border border-[#2a9d8f]/20 bg-white p-5 shadow-lg shadow-[#2a9d8f]/10 dark:bg-zinc-950">
      <div className="mb-5 flex items-center gap-2">
        <div className="rounded-full bg-[#2a9d8f]/15 px-3 py-1 text-xs font-medium text-[#2a9d8f]">
          ✨ AI Analysis
        </div>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          AI Insights
        </h2>
      </div>

      <div className="space-y-5">
        <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
          <p className="mb-1 text-sm text-gray-600 dark:text-zinc-400">
            Predicted Category
          </p>

          <p className="font-semibold text-gray-900 dark:text-white">
            {category ?? 'N/A'}
          </p>

          <div className="mt-3">
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-gray-600 dark:text-zinc-400">
                Confidence
              </span>

              <span className="font-medium text-[#2a9d8f]">
                {categoryPercent}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-200 dark:bg-zinc-800">
              <div
                className="h-2 rounded-full bg-[#2a9d8f]"
                style={{
                  width: `${categoryPercent}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
          <p className="mb-1 text-sm text-gray-600 dark:text-zinc-400">
            Predicted Priority
          </p>

          <p className="font-semibold text-gray-900 dark:text-white">
            {priority ?? 'N/A'}
          </p>

          <div className="mt-3">
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-gray-600 dark:text-zinc-400">
                Confidence
              </span>

              <span className="font-medium text-[#2a9d8f]">
                {priorityPercent}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-200 dark:bg-zinc-800">
              <div
                className="h-2 rounded-full bg-[#2a9d8f]"
                style={{
                  width: `${priorityPercent}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
          <p className="mb-2 text-sm text-gray-600 dark:text-zinc-400">
            AI Reasoning
          </p>

          <p className="text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
            {reasoning ?? 'No reasoning available'}
          </p>
        </div>
      </div>
    </div>
  );
}