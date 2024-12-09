import {ThemeFormFieldProps, ThemeGenericField} from "./GenericField";
import React, {InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes} from "react";
import {
  getInputCheckboxProps,
  getInputDateProps, getInputEmailProps, getInputFilesProps,
  getInputNumericProps,
  getInputPasswordProps, getInputRadioProps, getInputTextAreaProps,
  getInputTextProps,
  getSelectProps
} from "../utils/Utils";
import { Renderers } from "@sparkui/react-theme";

export interface SelectFieldProps<CustomProps> extends ThemeFormFieldProps<string, HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>, CustomProps> {}
export interface NumericFieldProps<CustomProps> extends Omit<ThemeFormFieldProps<number, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>, 'minLength' | 'maxLength'> {}
export interface TextFieldProps<CustomProps> extends Omit<ThemeFormFieldProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>, 'min' | 'max'> {}
export interface DateFieldProps<CustomProps> extends Omit<ThemeFormFieldProps<Date, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>, 'minLength' | 'maxLength'> {}
export interface FilesFieldProps<CustomProps> extends Omit<ThemeFormFieldProps<File[], HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>, 'min' | 'max'> {}
export interface CheckboxFieldProps<CustomProps> extends Omit<ThemeFormFieldProps<boolean, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>, 'min' | 'max' | 'minLength' | 'maxLength'> {}
export interface TextAreaFieldProps<CustomProps> extends Omit<ThemeFormFieldProps<string, HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>, CustomProps>, 'min' | 'max'> {}

export const SelectField = <CustomProps,>(
  {
    renderer,
    ...props
  }: SelectFieldProps<CustomProps>
) => (
  <ThemeGenericField<string, HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>, CustomProps>
    {...props}
    propsGenerator={getSelectProps}
    renderer={renderer ?? Renderers.FIELD_SELECT}
  />
);

export const TextField = <CustomProps,>(
  {
    renderer,
    ...props
  }: TextFieldProps<CustomProps>
) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    propsGenerator={getInputTextProps}
    renderer={renderer ?? Renderers.FIELD_TEXT}
  />
);

export const TextAreaField = <CustomProps,>(
  {
    renderer,
    ...props
  }: TextAreaFieldProps<CustomProps>
) => (
  <ThemeGenericField<string, HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>, CustomProps>
    {...props}
    propsGenerator={getInputTextAreaProps}
    renderer={renderer ?? Renderers.FIELD_TEXT_AREA}
  />
);

export const EmailField = <CustomProps,>(
  {
    renderer,
    ...props
  }: TextFieldProps<CustomProps>
) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    propsGenerator={getInputEmailProps}
    renderer={renderer ?? Renderers.FIELD_TEXT}
    pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
  />
);

export const PasswordField = <CustomProps,>(
  {
    renderer,
    ...props
  }: TextFieldProps<CustomProps>
) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    propsGenerator={getInputPasswordProps}
    renderer={renderer ?? Renderers.FIELD_TEXT}
  />
);

export const DateField = <CustomProps,>(
  {
    renderer,
    ...props
  }: DateFieldProps<CustomProps>
) => (
  <ThemeGenericField<Date, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    propsGenerator={getInputDateProps}
    renderer={renderer ?? Renderers.FIELD_DATE}
  />
);

export const FilesField = <CustomProps,>(
  {
    children,
    renderer,
    value = [],
    ...props
  }: FilesFieldProps<CustomProps>
) => (
  <ThemeGenericField<File[], HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    value={value}
    propsGenerator={getInputFilesProps}
    renderer={renderer ?? Renderers.FIELD_TEXT}
  />
);

export const NumericField = <CustomProps,>(
  {
    renderer,
    ...props
  }: NumericFieldProps<CustomProps>
) => (
  <ThemeGenericField<number, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    propsGenerator={getInputNumericProps}
    renderer={renderer ?? Renderers.FIELD_TEXT}
  />
);

export const CheckBoxField = <CustomProps,>(
  {
    renderer,
    ...props
  }: CheckboxFieldProps<CustomProps>
) => (
  <ThemeGenericField<boolean, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    propsGenerator={getInputCheckboxProps}
    renderer={renderer ?? Renderers.FIELD_CHECKBOX}
  />
);

export const RadioField = <CustomProps,>(
  {
    renderer,
    ...props
  }: TextFieldProps<CustomProps>
) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, CustomProps>
    {...props}
    propsGenerator={getInputRadioProps}
    renderer={renderer ?? Renderers.FIELD_RADIO}
  />
);

export const Field = ThemeGenericField;