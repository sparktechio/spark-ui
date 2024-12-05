import React, {JSX, useState, MouseEvent, KeyboardEvent} from "react";
import {useSelectContext} from "../context/DropdownContext";
import {useDebounce} from "../hooks/useDebounce";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";

export interface DropdownSearchChildrenProps {
  className?: string;
  onChange: (value?: string | null) => void;
  onClick: (event: MouseEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  value?: string;
}

export interface DropdownSearchProps<T> {
  className?: string;
  debounceMs?: number;
  children: (props: DropdownSearchChildrenProps) => JSX.Element;
}

export const DropdownSearch = <T,>(
  {
    className,
    debounceMs = 200,
    children,
  }: DropdownSearchProps<T>
) => {
  const {query, search} = useSelectContext();
  const [value, setValue] = useState(query);

  useDebounce({
    value,
    debounceMs,
    onChange: search
  })

  const onChange = (value?: string | null) => {
    if (value !== null && value !== undefined) {
      setValue(value);
    }
  }

  return (
    <RadixDropdown.Item>
      {
        children(
          {
            value,
            className,
            onChange,
            onKeyDown: (event: KeyboardEvent) => event.stopPropagation(),
            onClick: (event: MouseEvent) => event.stopPropagation()
          }
        )
      }
    </RadixDropdown.Item>
  );
}