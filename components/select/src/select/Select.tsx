import React, {JSX, ReactNode} from "react";
import {SelectSearch} from "./SelectSearch";
import {SelectContextProvider, useSelectContext} from "../context/SelectContext";
import {SelectOptions, SelectOption} from "./SelectOptions";

export interface SelectChildrenProps<T> {
  selected?: SelectOption<T>;
  query: string;
  loading: boolean;
  options: SelectOption<T>[]
}

export interface SelectProps<T> {
  selected?: string;
  options: SelectOption<T>[];
  onSearchOptions?: (query: string) => Promise<SelectOption<T>[]> | SelectOption<T>[];
  children: ((props: SelectChildrenProps<T>) => JSX.Element) | ReactNode;
}

export const Select = <T,>(
  {
    selected,
    options,
    onSearchOptions,
    children
  }: SelectProps<T>
) => {
  const {query, loading, selected: initialSelected, options: latestOptions} = useSelectContext();
  return (
    <SelectContextProvider
      initialValue={selected}
      initialOptions={options}
      onSearchOptions={onSearchOptions}
    >
      {
        (typeof children === 'function') ? (
          children(
            {
              query,
              loading,
              selected: initialSelected,
              options: latestOptions
            }
          )
        ) : (
          children
        )
      }
    </SelectContextProvider>
  );
}

Select.Search = SelectSearch;
Select.Options = SelectOptions;