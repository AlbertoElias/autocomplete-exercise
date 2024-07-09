import { AutocompleteClassnames } from "../../AutocompleteTypes";

interface AutocompleteSuggestionsProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  classNames: AutocompleteClassnames;
}

export default function AutocompleteSuggestions({
  suggestions,
  onSelect,
  classNames,
}: AutocompleteSuggestionsProps) {
  return (
    <ul className={classNames.list}>
      {suggestions.map((suggestion) => {
        return (
          <li
            key={suggestion}
            className={classNames?.listItem}
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </li>
        )
      })}
    </ul>
  )
}