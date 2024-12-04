import {JSX} from "react";
import {useSelectContext} from "../context/SelectContext";

export interface SelectOption<T> {
  id: string;
  value: T;
}

export interface SelectFieldChildrenProps<T> {
  className?: string;
  loading?: boolean;
  selected: SelectOption<T> | undefined;
  options: SelectOption<T>[];
  onSelect: (value: SelectOption<T>) => void;
  value?: string;
}

export interface SelectFieldProps<T> {
  className?: string;
  onSelect?: (value: SelectOption<T>) => void;
  onChange?: (value: T) => void;
  children: (props: SelectFieldChildrenProps<T>) => JSX.Element;
}

export const SelectOptions = <T,>(
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