import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";
import {Option} from "../dropdown/DropdownOptions";

export interface DropdownContextProps<T> {
  query: string;
  loading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  search: (query: string) => void;
  options: Option<T>[];
  onSelect: (value: Option<T>) => void;
  selected: Option<T> | undefined;
}

export interface DropdownContextProviderProps<T> {
  onSelect?: (value: Option<T>) => void;
  onChange?: (value: T) => void;
  initialQuery?: string;
  initialValue?: string;
  initialOptions?: Option<T>[]
  onSearchOptions?: (query: string) => Promise<Option<T>[]> | Option<T>[];
  children: ReactNode;
}

export const DropdownContext = createContext<DropdownContextProps<any>>({
  query: '',
  loading: false,
  open: false,
  options: [],
  search: () => [],
  onSelect: () => ({}),
  onOpenChange: () => ({}),
  selected: undefined,
});

export const useSelectContext = () => useContext(DropdownContext);

export const SelectContextProvider = <T,>(
  {
    onSelect,
    onChange,
    initialQuery = '',
    initialValue,
    initialOptions = [],
    onSearchOptions,
    children
  }: DropdownContextProviderProps<T>
) => {
  const [query, setQuery] = useState(initialQuery);
  const [open, onOpenChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(initialOptions.find(option => option.id === initialValue));
  const [options, setOptions] = useState(initialOptions);

  const search = async (query: string) => {
    setQuery(query);
    if (onSearchOptions) {
      setLoading(true);
      const newOptions = await onSearchOptions(query);
      if (newOptions) {
        setOptions(newOptions);
      }
      setLoading(false);
    }
  }

  const onSelectOption = (option: Option<T>) => {
    setSelected(option);
    onChange?.(option.value);
    onSelect?.(option);
  }

  return (
    <DropdownContext.Provider value={{ query, options, search, loading, selected, onSelect: onSelectOption, open, onOpenChange }}>
      {children}
    </DropdownContext.Provider>
  );
};
