import {BaseFormFieldProps, FormField, FormFieldProps} from "./FormField";
import React from "react";
import {
  getInputCheckboxProps,
  getInputDateProps, getInputEmailProps, getInputFilesProps,
  getInputNumericProps,
  getInputPasswordProps, getInputRadioProps, getInputTextAreaProps,
  getInputTextProps,
  getSelectProps
} from "../utils/Utils";
import {useThemeContext} from "@sparkui/react-theme";

export interface AppFormFieldProps<V, I> extends BaseFormFieldProps<V, I> {
  renderer: string;
}

export const SelectField = ({children, ...props}: FormFieldProps<string, HTMLSelectElement>) => (
  <FormField<string, HTMLSelectElement> {...props} propsGenerator={getSelectProps}>
    {children}
  </FormField>
);

export const TextField = ({children, ...props}: FormFieldProps<string, HTMLInputElement>) => (
  <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputTextProps}>
    {children}
  </FormField>
);

export const TextAreaField = ({children, ...props}: FormFieldProps<string, HTMLTextAreaElement>) => (
  <FormField<string, HTMLTextAreaElement> {...props} propsGenerator={getInputTextAreaProps}>
    {children}
  </FormField>
);

export const EmailField = ({children, ...props}: FormFieldProps<string, HTMLInputElement>) => (
  <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputEmailProps}>
    {children}
  </FormField>
);

export const PasswordField = ({children, ...props}: FormFieldProps<string, HTMLInputElement>) => (
  <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputPasswordProps}>
    {children}
  </FormField>
);

export const DateField = ({children, ...props}: FormFieldProps<Date, HTMLInputElement>) => (
  <FormField<Date, HTMLInputElement> {...props} propsGenerator={getInputDateProps}>
    {children}
  </FormField>
);

export const FilesField = ({children, value = [], ...props}: FormFieldProps<File[], HTMLInputElement>) => (
  <FormField<File[], HTMLInputElement> {...props} propsGenerator={getInputFilesProps}>
    {children}
  </FormField>
);

export const NumericField = ({children, ...props}: FormFieldProps<number, HTMLInputElement>) => (
  <FormField<number, HTMLInputElement> {...props} propsGenerator={getInputNumericProps}>
    {children}
  </FormField>
);

export const CheckBoxField = ({children, ...props}: FormFieldProps<boolean, HTMLInputElement>) => (
  <FormField<boolean, HTMLInputElement> {...props} propsGenerator={getInputCheckboxProps}>
    {children}
  </FormField>
);

export const RadioField = ({children, ...props}: FormFieldProps<string, HTMLInputElement>) => (
  <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputRadioProps}>
    {children}
  </FormField>
);

export const AppFormField = <V, I>({renderer, ...props}: AppFormFieldProps<V, I>) => {
  const {render} = useThemeContext();
  return (
    <FormField<V, I> {...props}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppSelectField = ({renderer, ...props}: AppFormFieldProps<string, HTMLSelectElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<string, HTMLSelectElement> {...props} propsGenerator={getSelectProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppTextField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputTextProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppTextAreaField = ({renderer, ...props}: AppFormFieldProps<string, HTMLTextAreaElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<string, HTMLTextAreaElement> {...props} propsGenerator={getInputTextAreaProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppEmailField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputEmailProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppPasswordField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputPasswordProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppDateField = ({renderer, ...props}: AppFormFieldProps<Date, HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<Date, HTMLInputElement> {...props} propsGenerator={getInputDateProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppFilesField = ({renderer, value = [], ...props}: AppFormFieldProps<File[], HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<File[], HTMLInputElement> {...props} propsGenerator={getInputFilesProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppNumericField = ({renderer, ...props}: AppFormFieldProps<number, HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<number, HTMLInputElement> {...props} propsGenerator={getInputNumericProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppCheckBoxField = ({renderer, ...props}: AppFormFieldProps<boolean, HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<boolean, HTMLInputElement> {...props} propsGenerator={getInputCheckboxProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}

export const AppRadioField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {render} = useThemeContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputRadioProps}>
      {(props) => render(renderer, props)}
    </FormField>
  );
}