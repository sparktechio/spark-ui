import React, {ReactNode} from "react";
import {FormProvider} from "./context/FormProvider";
import {FormField, FormFieldProps} from "./fields/FormField";
import {FormSubmit, FormSubmitProps} from "./fields/FormSubmit";
import {getButtonSubmitProps, getInputDateProps, getInputNumericProps, getInputTextProps} from "./utils/Utils";

export interface FormProps<F> {
  value?: F;
  children: ReactNode;
}

export const Form = <F,>({value, children}: FormProps<F>) => {
  return (
    <FormProvider value={value}>
      {children}
    </FormProvider>
  )
}

Form.Field = FormField;
Form.Submit = FormSubmit;

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