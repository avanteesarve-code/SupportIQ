interface AssignedAgentCardProps {
  agent?: {
    id: string;
    name: string;
    email: string;
  };
}

export function AssignedAgentCard({
  agent,
}: AssignedAgentCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-4 text-lg font-semibold">
        Assigned Agent
      </h3>

      {agent ? (
        <div className="space-y-2">
          <p className="font-medium">
            {agent.name}
          </p>

          <p className="text-sm text-gray-600 dark:text-zinc-400">
            {agent.email}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          No agent assigned
        </p>
      )}
    </div>
  );
}