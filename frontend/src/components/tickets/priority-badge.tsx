interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const styles = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM:
      'bg-blue-100 text-blue-800',
    HIGH:
      'bg-orange-100 text-orange-800',
    URGENT:
      'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[
          priority as keyof typeof styles
        ] ??
        'bg-gray-100 text-gray-800'
      }`}
    >
      {priority}
    </span>
  );
}