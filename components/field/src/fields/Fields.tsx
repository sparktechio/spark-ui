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

export const SelectField = <A,>(props: ThemeFormFieldProps<string, HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>, A>) => (
  <ThemeGenericField<string, HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>, A> {...props} propsGenerator={getSelectProps} renderer={Renderers.FIELD_SELECT} />
);

export const TextField = <A,>(props: ThemeFormFieldProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputTextProps} renderer={Renderers.FIELD_TEXT}  />
);

export const TextAreaField = <A,>(props: ThemeFormFieldProps<string, HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>, A>) => (
  <ThemeGenericField<string, HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>, A> {...props} propsGenerator={getInputTextAreaProps} renderer={Renderers.FIELD_TEXT_AREA}  />
);

export const EmailField = <A,>(props: ThemeFormFieldProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputEmailProps} renderer={Renderers.FIELD_TEXT} pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/} />
);

export const PasswordField = <A,>(props: ThemeFormFieldProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputPasswordProps} renderer={Renderers.FIELD_TEXT}  />
);

export const DateField = <A,>(props: ThemeFormFieldProps<Date, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<Date, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputDateProps} renderer={Renderers.FIELD_DATE}  />
);

export const FilesField = <A,>({children, value = [], ...props}: ThemeFormFieldProps<File[], HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<File[], HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputFilesProps} renderer={Renderers.FIELD_TEXT}  />
);

export const NumericField = <A,>(props: ThemeFormFieldProps<number, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<number, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputNumericProps} renderer={Renderers.FIELD_TEXT}  />
);

export const CheckBoxField = <A,>(props: ThemeFormFieldProps<boolean, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<boolean, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputCheckboxProps} renderer={Renderers.FIELD_CHECKBOX}  />
);

export const RadioField = <A,>(props: ThemeFormFieldProps<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A>) => (
  <ThemeGenericField<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, A> {...props} propsGenerator={getInputRadioProps} renderer={Renderers.FIELD_RADIO}  />
);

export const Field = ThemeGenericField;