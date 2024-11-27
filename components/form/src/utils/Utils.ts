import {ElementProps} from "../fields/FormField";
import {ChangeEvent} from "react";
import {SubmitChildrenProps} from "../fields/FormSubmit";

export const getInputTextProps = (
  {
    onChange,
    onBlur,
    value,
    name,
    ref
  }: ElementProps<string, HTMLInputElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "text",
    ref,
    value,
    name,
  }
}

export const getInputNumericProps = (
  {
    onChange,
    onBlur,
    value,
    name,
    ref
  }: ElementProps<number, HTMLInputElement>
) => {
  return {
    onChange: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsNumber),
    onBlur: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsNumber),
    type: "number",
    ref,
    value,
    name,
  }
}

export const getInputDateProps = (
  {
    onChange,
    onBlur,
    value,
    name,
    ref
  }: ElementProps<Date, HTMLInputElement>
) => {
  console.log(value?.toISOString().slice(0, 10));
  return {
    onChange: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsDate),
    onBlur: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsDate),
    type: "date",
    ref,
    value: value?.toISOString().slice(0, 10),
    name,
  }
}

export const getButtonSubmitProps = ({onSubmit, loading}: SubmitChildrenProps) => {
  return {
    onClick: onSubmit,
    disabled: loading,
    type: "button",
  }
}