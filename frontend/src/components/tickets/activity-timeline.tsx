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
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 font-semibold">
          Activity Timeline
        </h3>

        <p className="text-sm text-muted-foreground">
          No activity available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-6 font-semibold">
        Activity Timeline
      </h3>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="relative pl-10"
          >
            
            <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow" />

            
            {index !== activities.length - 1 && (
              <div className="absolute left-[7px] top-5 h-full w-0.5 bg-gray-300" />
            )}

            <p className="font-medium">
              {getActivityMessage(activity)}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
  {formatActivityDate(
    activity.createdAt,
  )}
</p>
          </div>
        ))}
      </div>
    </div>
  );
}