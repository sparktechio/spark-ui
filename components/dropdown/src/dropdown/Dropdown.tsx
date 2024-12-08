import React, {JSX, ReactNode} from "react";
import {DropdownSearch} from "./DropdownSearch";
import {SelectContextProvider, useSelectContext} from "../context/DropdownContext";
import {DropdownOptions, Option} from "./DropdownOptions";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import {DropdownOption} from "./DropdownOption";
import styled from "styled-components";

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
Dropdown.Portal = RadixDropdown.Portal;
Dropdown.InlineContent = RadixDropdown.Content;
Dropdown.Content = (props: RadixDropdown.DropdownMenuContentProps) => (
  <RadixDropdown.Portal>
    <StyledContent {...props}/>
  </RadixDropdown.Portal>
);
Dropdown.Item = RadixDropdown.Item;
Dropdown.Label = RadixDropdown.Label;
Dropdown.Group = RadixDropdown.Group;
Dropdown.Search = DropdownSearch;
Dropdown.Options = DropdownOptions;
Dropdown.Option = DropdownOption;

const StyledContent = styled(RadixDropdown.Content)`
    position: relative;
    margin-top: 4px;
    background-color: white;
    padding: 8px;
    border: 1px solid #c1c0c0;
    border-radius: 6px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`