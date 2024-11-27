import React, {ReactNode} from "react";
import {FormProvider} from "./context/FormProvider";
import {EnhancedField, FormField, FormFieldProps} from "./fields/FormField";
import {FormSubmit, FormSubmitProps} from "./fields/FormSubmit";
import {
  getButtonSubmitProps,
  getInputDateProps,
  getInputNumericProps,
  getInputTextProps,
  getSelectProps
} from "./utils/Utils";

export interface FormProps<F> {
  className?: string;
  hideForm?: boolean;
  value?: F;
  onChange?: (value: F) => void;
  onFieldChange?: (field: EnhancedField<any, any>) => void;
  children: ReactNode;
}

export const Form = <F,>({className, hideForm, value, onChange, onFieldChange, children}: FormProps<F>) => {
  return (
    hideForm ? (
        <FormProvider value={value} onChange={onChange} onFieldChange={onFieldChange}>
          {children}
        </FormProvider>
      ) : (
      <form className={className}>
        <FormProvider value={value} onChange={onChange} onFieldChange={onFieldChange}>
          {children}
        </FormProvider>
      </form>
    )
  )
}

Form.Field = FormField;
Form.Submit = FormSubmit;

Form.SelectField = ({children, ...props}: FormFieldProps<string, HTMLSelectElement>) => (
  <FormField<string, HTMLSelectElement> {...props} propsGenerator={getSelectProps}>
    {children}
  </FormField>
);

Form.TextField = ({children, ...props}: FormFieldProps<string, HTMLInputElement>) => (
  <FormField<string, HTMLInputElement> {...props} propsGenerator={getInputTextProps}>
    {children}
  </FormField>
);

Form.DateField = ({children, ...props}: FormFieldProps<Date, HTMLInputElement>) => (
  <FormField<Date, HTMLInputElement> {...props} propsGenerator={getInputDateProps}>
    {children}
  </FormField>
);

Form.NumericField = ({children, ...props}: FormFieldProps<number, HTMLInputElement>) => (
  <FormField<number, HTMLInputElement> {...props} propsGenerator={getInputNumericProps}>
    {children}
  </FormField>
);

Form.ButtonSubmit = ({children, ...props}: FormSubmitProps) => (
  <FormSubmit {...props} propsGenerator={getButtonSubmitProps}>
    {children}
  </FormSubmit>
);