import {ThemeFormFieldProps, ThemeGenericField} from "./GenericField";
import React from "react";
import {
  getInputCheckboxProps,
  getInputDateProps, getInputEmailProps, getInputFilesProps,
  getInputNumericProps,
  getInputPasswordProps, getInputRadioProps, getInputTextAreaProps,
  getInputTextProps,
  getSelectProps
} from "../utils/Utils";

export const SelectField = (props: ThemeFormFieldProps<string, HTMLSelectElement>) => (
  <ThemeGenericField<string, HTMLSelectElement> {...props} propsGenerator={getSelectProps} />
);

export const TextField = (props: ThemeFormFieldProps<string, HTMLInputElement>) => (
  <ThemeGenericField<string, HTMLInputElement> {...props} propsGenerator={getInputTextProps} />
);

export const TextAreaField = (props: ThemeFormFieldProps<string, HTMLTextAreaElement>) => (
  <ThemeGenericField<string, HTMLTextAreaElement> {...props} propsGenerator={getInputTextAreaProps} />
);

export const EmailField = (props: ThemeFormFieldProps<string, HTMLInputElement>) => (
  <ThemeGenericField<string, HTMLInputElement> {...props} propsGenerator={getInputEmailProps} />
);

export const PasswordField = (props: ThemeFormFieldProps<string, HTMLInputElement>) => (
  <ThemeGenericField<string, HTMLInputElement> {...props} propsGenerator={getInputPasswordProps} />
);

export const DateField = (props: ThemeFormFieldProps<Date, HTMLInputElement>) => (
  <ThemeGenericField<Date, HTMLInputElement> {...props} propsGenerator={getInputDateProps} />
);

export const FilesField = ({children, value = [], ...props}: ThemeFormFieldProps<File[], HTMLInputElement>) => (
  <ThemeGenericField<File[], HTMLInputElement> {...props} propsGenerator={getInputFilesProps} />
);

export const NumericField = (props: ThemeFormFieldProps<number, HTMLInputElement>) => (
  <ThemeGenericField<number, HTMLInputElement> {...props} propsGenerator={getInputNumericProps} />
);

export const CheckBoxField = (props: ThemeFormFieldProps<boolean, HTMLInputElement>) => (
  <ThemeGenericField<boolean, HTMLInputElement> {...props} propsGenerator={getInputCheckboxProps} />
);

export const RadioField = (props: ThemeFormFieldProps<string, HTMLInputElement>) => (
  <ThemeGenericField<string, HTMLInputElement> {...props} propsGenerator={getInputRadioProps} />
);

export const Field = ThemeGenericField;