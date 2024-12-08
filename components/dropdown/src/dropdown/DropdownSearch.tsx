import React, {useState, MouseEvent, KeyboardEvent} from "react";
import {useSelectContext} from "../context/DropdownContext";
import {useDebounce} from "../hooks/useDebounce";
import {FieldProps, TextField, ThemeFormFieldProps} from "@sparkui/react-field";
import {isDefined} from "@sparkui/react-utils";

export interface DropdownSearchProps<T> extends ThemeFormFieldProps<string, HTMLInputElement>{
  className?: string;
  debounceMs?: number;
}

export const DropdownSearch = <T,>(
  {
    className,
    debounceMs = 200,
    params,
    onChange,
    value,
    ...props
  }: DropdownSearchProps<T>
) => {
  const {query, search} = useSelectContext();
  const [searchQuery, setSearchQuery] = useState(value ?? query);

  useDebounce({
    value: searchQuery,
    debounceMs,
    onChange: search
  });

  const onChangeField = (field: FieldProps<string>) => {
    if (isDefined(field.value)) {
      setSearchQuery(field.value);
      if (onChange) {
        onChange(field)
      }
    }
  }

  return (
    <TextField
      onChange={onChangeField}
      value={searchQuery}
      params={{
        ...(params ?? {}),
        onKeyDown: (event: KeyboardEvent) => event.stopPropagation(),
        onClick: (event: MouseEvent) => event.stopPropagation()
      }}
      {...props}
    />
  );
}