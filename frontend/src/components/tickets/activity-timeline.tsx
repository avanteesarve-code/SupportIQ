import type { TicketActivity } from '@/types/ticket';

interface ActivityTimelineProps {
  activities?: TicketActivity[];
}

function getActivityMessage(
  activity: TicketActivity,
) {
  switch (activity.action) {
    case 'AUTO_ASSIGNED':
      return `Assigned to ${
        (
          activity.detail as {
            assignedAgentName?: string;
          }
        )?.assignedAgentName ?? 'an agent'
      }`;

    default:
      return activity.action
        .replaceAll('_', ' ')
        .toLowerCase()
        .replace(
          /\b\w/g,
          (char) => char.toUpperCase(),
        );
  }
}

function formatActivityDate(
  date: string,
) {
  return new Date(date).toLocaleString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    },
  );
}

export function ActivityTimeline({
  activities = [],
}: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-2xl border border-[#2a9d8f]/20 bg-white p-6 shadow-lg shadow-[#2a9d8f]/10 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-full bg-[#2a9d8f]/15 px-3 py-1 text-xs font-medium text-[#2a9d8f]">
            📜 Timeline
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Activity Timeline
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-zinc-400">
          No activity available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#2a9d8f]/20 bg-white p-6 shadow-lg shadow-[#2a9d8f]/10 dark:bg-zinc-950">
      <div className="mb-6 flex items-center gap-2">
        <div className="rounded-full bg-[#2a9d8f]/15 px-3 py-1 text-xs font-medium text-[#2a9d8f]">
          📜 Timeline
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white">
          Activity Timeline
        </h3>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="relative pl-12"
          >
            <div className="absolute left-0 top-2 flex items-center justify-center">
              <div className="h-5 w-5 rounded-full border-4 border-[#2a9d8f]/20 bg-[#2a9d8f]" />
            </div>

            {index !== activities.length - 1 && (
              <div className="absolute left-[9px] top-7 h-full w-0.5 bg-[#2a9d8f]/20" />
            )}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-[#2a9d8f]/40 dark:border-zinc-800 dark:bg-black/30">
              <p className="font-medium text-gray-900 dark:text-white">
                {getActivityMessage(activity)}
              </p>

              <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
                {formatActivityDate(
                  activity.createdAt,
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}