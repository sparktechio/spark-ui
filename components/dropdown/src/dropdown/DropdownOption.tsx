import {Option as Option} from "./DropdownOptions";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import React from "react";
import {useSelectContext} from "../context/DropdownContext";
import styled from "styled-components";

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
    <StyledItem onSelect={() => onSelect(option)}>
      {children}
    </StyledItem>
  );
}

const StyledItem = styled(RadixDropdown.Item)`
    &:focus-visible, &:focus, &:hover, &:active {
        outline: none;
        text-transform: uppercase;
    }
`;