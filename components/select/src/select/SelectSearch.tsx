import {JSX, useState} from "react";
import {useSelectContext} from "../context/SelectContext";
import {useDebounce} from "../hooks/useDebounce";

export interface SelectSearchChildrenProps {
  className?: string;
  onChange: (value?: string | null) => void;
  value?: string;
}

export interface SelectSearchProps<T> {
  className?: string;
  debounceMs?: number;
  children: (props: SelectSearchChildrenProps) => JSX.Element;
}

export const SelectSearch = <T,>(
  {
    className,
    debounceMs = 200,
    children,
  }: SelectSearchProps<T>
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

  return children(
    {
      value,
      className,
      onChange
    }
  );
}