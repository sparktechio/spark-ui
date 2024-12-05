import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";
import {DropdownOption} from "../dropdown/DropdownOptions";

export interface DropdownContextProps<T> {
  query: string;
  loading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  search: (query: string) => void;
  options: DropdownOption<T>[];
  onSelect: (value: DropdownOption<T>) => void;
  selected: DropdownOption<T> | undefined;
}

export interface DropdownContextProviderProps<T> {
  initialQuery?: string;
  initialValue?: string;
  initialOptions?: DropdownOption<T>[]
  onSearchOptions?: (query: string) => Promise<DropdownOption<T>[]> | DropdownOption<T>[];
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

  const onSelect = (option: DropdownOption<T>) => {
    setSelected(option);
  }

  return (
    <DropdownContext.Provider value={{ query, options, search, loading, selected, onSelect, open, onOpenChange }}>
      {children}
    </DropdownContext.Provider>
  );
};
