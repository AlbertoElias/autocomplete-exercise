import { AutocompleteClassnames } from "../../AutocompleteTypes";

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  classNames: AutocompleteClassnames;
}

export default function AutocompleteInput({
  value,
  onChange,
  classNames,
}: AutocompleteInputProps) {
  return (
    <input
      className={classNames.input}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => onChange(e.target.value)}
      value={value}
    />
  )
}