import React, {ReactNode} from "react";
import {FormProvider} from "./context/FormProvider";
import {FormField, FormNumericField, FormTextField} from "./fields/FormField";
import {FormButtonSubmit, FormSubmit} from "./fields/FormSubmit";

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
Form.TextField = FormTextField;
Form.NumericField = FormNumericField;
Form.Submit = FormSubmit;
Form.ButtonSubmit = FormButtonSubmit;