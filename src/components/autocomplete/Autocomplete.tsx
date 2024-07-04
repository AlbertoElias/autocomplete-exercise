import { useCallback, useState } from "react";
import "./Autocomplete.css";
import { AutocompleteClassnames, AutocompleteProps } from "./AutocompleteTypes";
import useDebounce from "./hooks/useDebounce";

const defaultClassnames: AutocompleteClassnames = {
  wrapper: 'autocomplete',
  input: 'autocomplete__input',
  list: 'autocomplete__list',
  listItem: 'autocomplete__list-item',
};

export default function Autocomplete({
  suggestions,
  onSelected,
  classNames,
  debounceDelay = 150,
}: AutocompleteProps) {
  classNames = { ...defaultClassnames, ...classNames };
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const filterSuggestions = useCallback((value: string) => {
    const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()));
    setFilteredSuggestions(filtered);
  }, [suggestions]);

  const debouncedFilterSuggestions = useDebounce(filterSuggestions, debounceDelay);

  function handleInputChange(value: string) {
    setInputValue(value);
    debouncedFilterSuggestions(value);
  }

  function handleInputClick(value: string) {
    setInputValue(value);
    onSelected(value);
    setFilteredSuggestions([]);
  }

  return (
    <div className={classNames.wrapper}>
      <input
        className={classNames.input}
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputValue}
      />
      <ul className={classNames.list}>
        {filteredSuggestions.map((suggestion) => {
          return (
            <li key={suggestion} className={classNames.listItem} onClick={() => handleInputClick(suggestion)}>{suggestion}</li>
          )
        })}
      </ul>
    </div>
  )
}