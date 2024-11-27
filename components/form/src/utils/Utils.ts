import {ElementProps} from "../fields/FormField";
import {ChangeEvent} from "react";
import {SubmitChildrenProps} from "../fields/FormSubmit";
import {isDefined} from "../validation/Validator";

export const getSelectProps = (
  {
    onChange,
    onBlur,
    value,
    ref
  }: ElementProps<string, HTMLSelectElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    ref,
    value,
  }
}

export const getInputTextProps = (
  {
    onChange,
    onBlur,
    value,
    ref
  }: ElementProps<string, HTMLInputElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "text",
    ref,
    value,
  }
}

export const getInputNumericProps = (
  {
    onChange,
    onBlur,
    value,
    ref
  }: ElementProps<number, HTMLInputElement>
) => {
  return {
    onChange: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsNumber),
    onBlur: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsNumber),
    type: "number",
    ref,
    value,
  }
}

export const getInputCheckboxProps = (
  {
    onChange,
    onBlur,
    value,
    ref
  }: ElementProps<boolean, HTMLInputElement>
) => {
  return {
    onChange: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onChange(checked),
    onBlur: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onBlur(checked),
    type: "checkbox",
    ref,
    checked: isDefined(value) ? value : false,
  }
}

export const getInputRadioProps = (
  {
    onChange,
    onBlur,
    ref
  }: ElementProps<string, HTMLInputElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "radio",
    ref,
  }
}

export const getInputDateProps = (
  {
    onChange,
    onBlur,
    value,
    ref
  }: ElementProps<Date, HTMLInputElement>
) => {
  return {
    onChange: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsDate),
    onBlur: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsDate),
    type: "date",
    ref,
    value: value ? new Date(value).toISOString().slice(0, 10): undefined,
  }
}

export const getButtonSubmitProps = ({onSubmit, loading}: SubmitChildrenProps) => {
  return {
    onClick: onSubmit,
    disabled: loading,
    type: "button",
  }
}