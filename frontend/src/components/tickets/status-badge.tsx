interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    OPEN: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-300',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    RESOLVED: 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[
          status as keyof typeof styles
        ] ??
        'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-100'
      }`}
    >
      {status}
    </span>
  );
}