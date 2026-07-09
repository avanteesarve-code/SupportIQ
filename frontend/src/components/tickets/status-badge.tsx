interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    OPEN: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS:
      'bg-blue-100 text-blue-800',
    RESOLVED:
      'bg-green-100 text-green-800',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[
          status as keyof typeof styles
        ] ??
        'bg-gray-100 text-gray-800'
      }`}
    >
      {status}
    </span>
  );
}