import React, {JSX, ReactNode} from "react";
import {DropdownSearch} from "./DropdownSearch";
import {SelectContextProvider, useSelectContext} from "../context/DropdownContext";
import {DropdownOptions, Option} from "./DropdownOptions";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import {DropdownOption} from "./DropdownOption";

export interface DropdownChildrenProps<T> {
  selected?: Option<T>;
  query: string;
  loading: boolean;
  options: Option<T>[]
}

export interface DropdownProps<T> extends Omit<RadixDropdown.DropdownMenuProps, 'children'> {
  selected?: string;
  query?: string;
  onSelect?: (value: Option<T>) => void;
  onChange?: (value: T) => void;
  options?: Option<T>[];
  onSearchOptions?: (query: string) => Promise<Option<T>[]> | Option<T>[];
  children: ((props: DropdownChildrenProps<T>) => JSX.Element) | ReactNode;
}

export const Dropdown = <T,>(
  {
    selected,
    query,
    onSelect,
    onChange,
    options,
    onSearchOptions,
    children,
    ...radixProps
  }: DropdownProps<T>
) => {
  const {query: latestQuery, loading, selected: latestSelected, options: latestOptions} = useSelectContext();
  return (
    <RadixDropdown.Root {...radixProps}>
      <SelectContextProvider
        onSelect={onSelect}
        onChange={onChange}
        initialQuery={query}
        initialValue={selected}
        initialOptions={options}
        onSearchOptions={onSearchOptions}
      >
        {
          (typeof children === 'function') ? (
            children(
              {
                loading,
                query: latestQuery,
                selected: latestSelected,
                options: latestOptions
              }
            )
          ) : (
            children
          )
        }
      </SelectContextProvider>
    </RadixDropdown.Root>
  );
}

Dropdown.Trigger = RadixDropdown.Trigger;
Dropdown.Content = (props: RadixDropdown.DropdownMenuContentProps) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content {...props}/>
  </RadixDropdown.Portal>
);
Dropdown.Item = RadixDropdown.Item;
Dropdown.Label = RadixDropdown.Label;
Dropdown.Group = RadixDropdown.Group;
Dropdown.Search = DropdownSearch;
Dropdown.Options = DropdownOptions;
Dropdown.Option = DropdownOption;