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
    <div className="rounded-lg border p-6">
      <h3 className="font-semibold mb-4">Assigned Agent</h3>

      {agent ? (
        <div className="space-y-2">
          <p className="font-medium">{agent.name}</p>
          <p className="text-sm text-muted-foreground">
            {agent.email}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No agent assigned
        </p>
      )}
    </div>
  );
}