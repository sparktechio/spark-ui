import {FieldChildrenProps} from "../fields/BaseField";
import {ChangeEvent, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes} from "react";
import {isDefined} from "@sparkui/react-utils";

export const getSelectProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      disabled,
    }
  }: FieldChildrenProps<string, HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>, A>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    ref,
    value,
    required,
    disabled,
  }
}

export const getInputTextProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      minLength,
      maxLength,
      disabled,
    },
    formatElementValue = (value) => isDefined(value) ? value : '',
  }: FieldChildrenProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    value: formatElementValue(value),
    type: "text",
    ref,
    required,
    minLength,
    maxLength,
    disabled,
  }
}

export const getInputTextAreaProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      minLength,
      maxLength,
      disabled,
    },
    formatElementValue = (value) => isDefined(value) ? value : '',
  }: FieldChildrenProps<string, HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>, A>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => onBlur(value),
    value: formatElementValue(value),
    ref,
    required,
    minLength,
    maxLength,
    disabled,
  }
}

export const getInputEmailProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      minLength,
      maxLength,
      disabled,
    },
    formatElementValue = (value) => isDefined(value) ? value : '',
  }: FieldChildrenProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    value: formatElementValue(value),
    type: "email",
    ref,
    required,
    minLength,
    maxLength,
    disabled,
  }
}

export const getInputPasswordProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      minLength,
      maxLength,
      disabled,
    },
    formatElementValue = (value) => isDefined(value) ? value : '',
  }: FieldChildrenProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "password",
    value: formatElementValue(value),
    ref,
    required,
    minLength,
    maxLength,
    disabled,
  }
}

export const getInputNumericProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      min,
      max,
      disabled,
    },
    formatElementValue = value => isDefined(value) ? value : ''
  }: FieldChildrenProps<number, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsNumber),
    onBlur: ({target: {valueAsNumber}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsNumber),
    value: formatElementValue(value),
    type: "number",
    ref,
    required,
    min,
    max,
    disabled,
  }
}

export const getInputCheckboxProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      disabled,
    },
    formatElementValue = (value) => isDefined(value) ? value : false,
  }: FieldChildrenProps<boolean, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onChange(checked),
    onBlur: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onBlur(checked),
    checked: formatElementValue(value),
    type: "checkbox",
    ref,
    required,
    disabled,
  }
}

export const getInputRadioProps = <A>(
  {
    onChange,
    onBlur,
    field,
    ref,
    field: {
      required,
      disabled,
    }
  }: FieldChildrenProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "radio",
    name: field.param,
    required,
    ref,
    disabled,
  }
}

export const getInputDateProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      disabled,
    },
    formatElementValue = (value?: Date) => (value ? new Date(value).toISOString().slice(0, 10): '')
  }: FieldChildrenProps<Date, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsDate),
    onBlur: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsDate),
    value: formatElementValue(value),
    type: "date",
    ref,
    required,
    disabled,
  }
}

export const getInputFilesProps = <A>(
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      disabled,
    },
    formatElementValue = (value) => isDefined(value) ? value : [],
  }: FieldChildrenProps<File[], HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>
) => {
  return {
    onChange: ({target: {files}}: ChangeEvent<HTMLInputElement>) => onChange(Array.from(files ?? [])),
    onBlur: ({target: {files}}: ChangeEvent<HTMLInputElement>) => onBlur(Array.from(files ?? [])),
    value: formatElementValue(value),
    type: "file",
    ref,
    required,
    disabled,
  }
}