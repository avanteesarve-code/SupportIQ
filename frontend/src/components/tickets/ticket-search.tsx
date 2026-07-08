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
      className="w-full rounded-md border p-3"
    />
  );
}