interface TicketSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TicketSearch({
  value,
  onChange,
}: TicketSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search tickets..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 shadow-sm outline-none transition focus:ring-2 focus:ring-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-white"
    />
  );
}