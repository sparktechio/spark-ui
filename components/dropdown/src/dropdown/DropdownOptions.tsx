import {JSX} from "react";
import {useSelectContext} from "../context/DropdownContext";

export interface DropdownOption<T> {
  id: string;
  value: T;
}

export interface SelectFieldChildrenProps<T> {
  className?: string;
  loading?: boolean;
  selected: DropdownOption<T> | undefined;
  options: DropdownOption<T>[];
  onSelect: (value: DropdownOption<T>) => void;
  value?: string;
}

export interface SelectFieldProps<T> {
  className?: string;
  onSelect?: (value: DropdownOption<T>) => void;
  onChange?: (value: T) => void;
  children: (props: SelectFieldChildrenProps<T>) => JSX.Element;
}

export const DropdownOptions = <T,>(
  {
    className,
    onSelect,
    onChange,
    children,
  }: SelectFieldProps<T>
) => {
  const {selected, onSelect: onSelectOption, options, loading} = useSelectContext();

  return children(
    {
      className,
      selected,
      options,
      loading,
      onSelect: (option) => {
        onChange?.(option.value);
        onSelect?.(option);
        onSelectOption(option);
      }
    }
  );
}