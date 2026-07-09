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
      className="rounded-md border px-3 py-2"
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