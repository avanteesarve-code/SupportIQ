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
      return activity.action;
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
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
        <h3 className="mb-4 font-semibold">
          Activity Timeline
        </h3>

        <p className="text-sm text-gray-600 dark:text-zinc-400">
          No activity available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
      <h3 className="mb-6 font-semibold">
        Activity Timeline
      </h3>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="relative pl-10"
          >
            <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-900 shadow dark:border-zinc-950 dark:bg-white" />

            {index !== activities.length - 1 && (
              <div className="absolute left-[7px] top-5 h-full w-0.5 bg-gray-200 dark:bg-zinc-800" />
            )}

            <p className="font-medium">
              {getActivityMessage(activity)}
            </p>

            <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
              {formatActivityDate(activity.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}