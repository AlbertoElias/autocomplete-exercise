export interface AutocompleteProps {
  suggestions: string[];
  onSelected: (value: string) => void;
  classNames?: AutocompleteClassnames;
  debounceDelay?: number;
};

export interface AutocompleteClassnames {
  wrapper?: string;
  input?: string;
  list?: string;
  listItem?: string;
  activeListItem?: string;
};