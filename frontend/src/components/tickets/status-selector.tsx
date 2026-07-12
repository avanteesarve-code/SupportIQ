interface StatusSelectorProps {
  value: string;
  onChange: (status: string) => void;
}

export function StatusSelector({
  value,
  onChange,
}: StatusSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:ring-2 focus:ring-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:ring-white"
    >
      <option value="OPEN">
        OPEN
      </option>

      <option value="IN_PROGRESS">
        IN PROGRESS
      </option>

      <option value="RESOLVED">
        RESOLVED
      </option>
    </select>
  );
}