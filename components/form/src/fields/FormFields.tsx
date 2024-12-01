import {BaseFormFieldProps, FormField, FormFieldProps} from "./FormField";
import React from "react";
import {useFormRenderContext} from "../context/FormRenderProvider";
import {
  getInputCheckboxProps,
  getInputDateProps, getInputEmailProps, getInputFilesProps,
  getInputNumericProps,
  getInputPasswordProps, getInputRadioProps, getInputTextAreaProps,
  getInputTextProps,
  getSelectProps
} from "../utils/Utils";

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
  const {renderField} = useFormRenderContext();
  return (
    <FormField<V, I> {...props}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppSelectField = ({renderer, ...props}: AppFormFieldProps<string, HTMLSelectElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<string, HTMLSelectElement> {...props} propsGenerator={getSelectProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppTextField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputTextProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppTextAreaField = ({renderer, ...props}: AppFormFieldProps<string, HTMLTextAreaElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<string, HTMLTextAreaElement> {...props} propsGenerator={getInputTextAreaProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppEmailField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputEmailProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppPasswordField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputPasswordProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppDateField = ({renderer, ...props}: AppFormFieldProps<Date, HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<Date, HTMLInputElement> {...props} propsGenerator={getInputDateProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppFilesField = ({renderer, value = [], ...props}: AppFormFieldProps<File[], HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<File[], HTMLInputElement> {...props} propsGenerator={getInputFilesProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppNumericField = ({renderer, ...props}: AppFormFieldProps<number, HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<number, HTMLInputElement> {...props} propsGenerator={getInputNumericProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppCheckBoxField = ({renderer, ...props}: AppFormFieldProps<boolean, HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<boolean, HTMLInputElement> {...props} propsGenerator={getInputCheckboxProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}

export const AppRadioField = ({renderer, ...props}: AppFormFieldProps<string, HTMLInputElement>) => {
  const {renderField} = useFormRenderContext();
  return (
    <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputRadioProps}>
      {(props) => renderField(renderer, props)}
    </FormField>
  );
}