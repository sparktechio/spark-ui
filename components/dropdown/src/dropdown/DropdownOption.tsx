import {Option as Option} from "./DropdownOptions";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import React from "react";
import {useSelectContext} from "../context/DropdownContext";

export interface DropdownOptionProps<T> {
  option: Option<T>;
  children: React.ReactNode;
}

export const DropdownOption = <T,>(
  {
    option,
    children
  }: DropdownOptionProps<T>
) => {
  const {onSelect} = useSelectContext()
  return (
    <RadixDropdown.Item onSelect={() => onSelect(option)}>
      {children}
    </RadixDropdown.Item>
  );
}