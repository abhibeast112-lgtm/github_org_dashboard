interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      placeholder="Enter GitHub org (e.g. facebook)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: 10, width: "100%" }}
    />
  );
}
