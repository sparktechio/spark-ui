import React, {JSX, ReactNode} from "react";
import {DropdownSearch} from "./DropdownSearch";
import {SelectContextProvider, useSelectContext} from "../context/DropdownContext";
import {DropdownOptions, DropdownOption} from "./DropdownOptions";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";

export interface DropdownChildrenProps<T> {
  selected?: DropdownOption<T>;
  query: string;
  loading: boolean;
  options: DropdownOption<T>[]
}

export interface DropdownProps<T> extends Omit<RadixDropdown.DropdownMenuProps, 'children'> {
  selected?: string;
  query?: string;
  options?: DropdownOption<T>[];
  onSearchOptions?: (query: string) => Promise<DropdownOption<T>[]> | DropdownOption<T>[];
  children: ((props: DropdownChildrenProps<T>) => JSX.Element) | ReactNode;
}

export const Dropdown = <T,>(
  {
    selected,
    query,
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