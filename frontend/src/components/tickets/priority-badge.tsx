interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const styles = {
    LOW: 'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-100',
    MEDIUM: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
    URGENT: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[
          priority as keyof typeof styles
        ] ??
        'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-100'
      }`}
    >
      {priority}
    </span>
  );
}