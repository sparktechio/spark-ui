import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";
import {SelectOptions} from "../select/SelectOptions";

export interface SelectContextProps<T> {
  query: string;
  loading: boolean;
  search: (query: string) => void;
  options: SelectOptions<T>[];
  onSelect: (value: SelectOptions<T>) => void;
  selected: SelectOptions<T> | undefined;
}

export interface SelectContextProviderProps<T> {
  initialValue?: string;
  initialOptions: SelectOptions<T>[]
  onSearchOptions?: (query: string) => Promise<SelectOptions<T>[]> | SelectOptions<T>[];
  children: ReactNode;
}

export const SelectContext = createContext<SelectContextProps<any>>({
  query: '',
  loading: false,
  options: [],
  search: () => [],
  onSelect: () => ({}),
  selected: undefined,
});

export const useSelectContext = () => useContext(SelectContext);

export const SelectContextProvider = <T,>(
  {
    initialValue,
    initialOptions,
    onSearchOptions,
    children
  }: SelectContextProviderProps<T>
) => {
  const [query, setQuery] = useState('');
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

  const onSelect = (option: SelectOptions<T>) => {
    setSelected(option);
  }

  return (
    <SelectContext.Provider value={{ query, options, search, loading, selected, onSelect }}>
      {children}
    </SelectContext.Provider>
  );
};
