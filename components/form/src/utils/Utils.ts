import {FieldChildrenProps} from "../fields/FormField";
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
      disabled,
    }
  }: FieldChildrenProps<string, HTMLSelectElement>
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
      disabled,
    }
  }: FieldChildrenProps<string, HTMLInputElement>
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
    disabled,
  }
}

export const getInputTextAreaProps = (
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
    }
  }: FieldChildrenProps<string, HTMLTextAreaElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => onBlur(value),
    ref,
    value,
    required,
    minLength,
    maxLength,
    disabled,
  }
}

export const getInputEmailProps = (
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
    }
  }: FieldChildrenProps<string, HTMLInputElement>
) => {
  return {
    onChange: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onChange(value),
    onBlur: ({target: {value}}: ChangeEvent<HTMLInputElement>) => onBlur(value),
    type: "email",
    ref,
    value,
    required,
    minLength,
    maxLength,
    disabled,
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
      disabled,
    }
  }: FieldChildrenProps<string, HTMLInputElement>
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
    disabled,
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
      disabled,
    }
  }: FieldChildrenProps<number, HTMLInputElement>
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
    disabled,
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
      disabled,
    }
  }: FieldChildrenProps<boolean, HTMLInputElement>
) => {
  return {
    onChange: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onChange(checked),
    onBlur: ({target: {checked}}: ChangeEvent<HTMLInputElement>) => onBlur(checked),
    type: "checkbox",
    checked: isDefined(value) ? value : false,
    ref,
    required,
    disabled,
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
      disabled,
    }
  }: FieldChildrenProps<string, HTMLInputElement>
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

export const getInputDateProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      disabled,
    },
    formatValue = (value?: Date) => (value ? new Date(value).toISOString().slice(0, 10): undefined)
  }: FieldChildrenProps<Date, HTMLInputElement>
) => {
  return {
    onChange: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onChange(valueAsDate),
    onBlur: ({target: {valueAsDate}}: ChangeEvent<HTMLInputElement>) => onBlur(valueAsDate),
    type: "date",
    value: formatValue(value),
    ref,
    required,
    disabled,
  }
}

export const getInputFilesProps = (
  {
    onChange,
    onBlur,
    value,
    ref,
    field: {
      required,
      disabled,
    },
  }: FieldChildrenProps<File[], HTMLInputElement>
) => {
  return {
    onChange: ({target: {files}}: ChangeEvent<HTMLInputElement>) => onChange(Array.from(files ?? [])),
    onBlur: ({target: {files}}: ChangeEvent<HTMLInputElement>) => onBlur(Array.from(files ?? [])),
    type: "file",
    value,
    ref,
    required,
    disabled,
  }
}

export const getButtonSubmitProps = ({onSubmit, loading}: SubmitChildrenProps) => {
  return {
    onClick: onSubmit,
    disabled: loading,
    type: "button",
  }
}