import {JSX, useState, MouseEvent, KeyboardEvent, InputHTMLAttributes} from "react";
import {useSelectContext} from "../context/DropdownContext";
import {useDebounce} from "../hooks/useDebounce";
import {FieldProps, ThemeFormFieldProps} from "@sparkui/react-field";
import {isDefined} from "@sparkui/react-utils";

export interface DropdownSearchProps<A> {
  value?: string;
  debounceMs?: number;
  onChange?: (value: string) => void;
  children: (props: ThemeFormFieldProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => JSX.Element;
}

export const DropdownSearch = <A,>(
  {
    value,
    onChange,
    children,
    debounceMs = 200,
  }: DropdownSearchProps<A>
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
        onChange(field.value)
      }
    }
  }

  return (
    children({
      onChange: onChangeField,
      value: searchQuery,
      params: {
        onKeyDown: (event: KeyboardEvent) => event.stopPropagation(),
        onClick: (event: MouseEvent) => event.stopPropagation()
      }
    })
  );
}