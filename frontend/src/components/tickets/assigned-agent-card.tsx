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
    <div className="rounded-2xl border border-[#2a9d8f]/20 bg-white p-6 shadow-lg shadow-[#2a9d8f]/10 dark:bg-zinc-950">
      <div className="mb-5 flex items-center gap-2">
        <div className="rounded-full bg-[#2a9d8f]/15 px-3 py-1 text-xs font-medium text-[#2a9d8f]">
          👤 Agent
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Assigned Agent
        </h3>
      </div>

      {agent ? (
        <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2a9d8f]/15 text-lg font-semibold text-[#2a9d8f]">
              {agent.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">
                {agent.name}
              </p>

              <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
                {agent.email}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              Available
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center dark:border-zinc-700">
          <p className="font-medium text-gray-900 dark:text-white">
            No Agent Assigned
          </p>

          <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
            AI assignment pending
          </p>
        </div>
      )}
    </div>
  );
}