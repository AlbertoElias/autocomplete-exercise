import { useCallback, useRef, useState } from "react";
import "./Autocomplete.css";
import { AutocompleteClassnames, AutocompleteProps } from "./AutocompleteTypes";
import useDebounce from "./hooks/useDebounce";
import AutocompleteSuggestions from "./components/AutocompleteSuggestions/AutocompleteSuggestions";
import AutocompleteInput from "./components/AutocompleteInput/AutocompleteInput";
import { useClickOutside } from "./hooks/useClickOutside";

const defaultClassnames: AutocompleteClassnames = {
  wrapper: 'autocomplete',
  input: 'autocomplete__input',
  list: 'autocomplete__list',
  listItem: 'autocomplete__list-item',
  activeListItem: 'autocomplete__list-item--active',
};

export default function Autocomplete({
  suggestions,
  onSelected,
  classNames,
  debounceDelay = 150,
}: AutocompleteProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mergedClassNames = { ...defaultClassnames, ...classNames };
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useClickOutside(wrapperRef, () => setFilteredSuggestions([]));

  const filterSuggestions = useCallback((value: string) => {
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
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
    <div className={mergedClassNames.wrapper} ref={wrapperRef}>
      <AutocompleteInput
        value={inputValue}
        onChange={handleInputChange}
        classNames={mergedClassNames}
      />
      <AutocompleteSuggestions
        suggestions={filteredSuggestions}
        onSelect={handleInputClick}
        classNames={mergedClassNames}
      />
    </div>
  )
}