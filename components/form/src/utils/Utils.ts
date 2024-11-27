import {ElementProps} from "../fields/FormField";
import {ChangeEvent} from "react";
import {SubmitChildrenProps} from "../fields/FormSubmit";

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