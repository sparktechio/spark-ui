import {JSX} from "react";
import {useSelectContext} from "../context/DropdownContext";

export interface Option<T> {
  id: string;
  value: T;
}

export interface SelectFieldChildrenProps<T> {
  className?: string;
  loading?: boolean;
  selected: Option<T> | undefined;
  options: Option<T>[];
  onSelect: (value: Option<T>) => void;
  value?: string;
}

export interface SelectFieldProps<T> {
  className?: string;
  children: (props: SelectFieldChildrenProps<T>) => JSX.Element;
}

export const DropdownOptions = <T,>(
  {
    className,
    children,
  }: SelectFieldProps<T>
) => {
  const {selected, onSelect, options, loading} = useSelectContext();

  return children(
    {
      className,
      selected,
      options,
      loading,
      onSelect
    }
  );
}