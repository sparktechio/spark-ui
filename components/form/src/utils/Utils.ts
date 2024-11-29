import {ElementProps} from "../fields/FormField";
import {ChangeEvent} from "react";
import {SubmitChildrenProps} from "../fields/FormSubmit";
import {isDefined} from "../validation/Validator";

export const getSelectProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
    }
  }: ElementProps<string, HTMLSelectElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    ref,
    value,
    required,
  }
}

export const getInputTextProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      minLength,
      maxLength,
    }
  }: ElementProps<string, HTMLInputElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "text",
    ref,
    value,
    required,
    minLength,
    maxLength,
  }
}

export const getInputPasswordProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      minLength,
      maxLength,
    }
  }: ElementProps<string, HTMLInputElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "password",
    ref,
    value,
    required,
    minLength,
    maxLength,
  }
}

export const getInputNumericProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      min,
      max,
    }
  }: ElementProps<number, HTMLInputElement>
) => {
  return {
    onChange: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsNumber),
    onBlur: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsNumber),
    type: "number",
    ref,
    value,
    required,
    min,
    max,
  }
}

export const getInputCheckboxProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
    }
  }: ElementProps<boolean, HTMLInputElement>
) => {
  return {
    onChange: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onChange(checked),
    onBlur: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onBlur(checked),
    type: "checkbox",
    checked: isDefined(value) ? value : false,
    ref,
    required,
  }
}

export const getInputRadioProps = (
  {
    onChange,
    onBlur,
    field,
    ref,
    field: {
      required,
    }
  }: ElementProps<string, HTMLInputElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "radio",
    name: field.param,
    required,
    ref,
}
}

export const getInputDateProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
    },
    format = (value?: Date) => (value ? new Date(value).toISOString().slice(0, 10): undefined)
  }: ElementProps<Date, HTMLInputElement>
) => {
  return {
    onChange: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsDate),
    onBlur: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsDate),
    type: "date",
    value: format(value),
    ref,
    required,
  }
}

export const getButtonSubmitProps = ({onSubmit, loading}: SubmitChildrenProps) => {
  return {
    onClick: onSubmit,
    disabled: loading,
    type: "button",
  }
}