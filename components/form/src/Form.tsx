import React, {FormHTMLAttributes, ReactNode} from "react";
import {FormProvider} from "./context/FormProvider";
import {EnhancedField, FormField} from "./fields/FormField";
import {BaseFormSubmitProps, FormSubmit, FormSubmitProps} from "./fields/FormSubmit";
import {
  getButtonSubmitProps
} from "./utils/Utils";
import {
  AppCheckBoxField, AppDateField,
  AppFormField, AppNumericField,
  AppPasswordField, AppRadioField,
  AppSelectField,
  AppTextField, CheckBoxField, DateField, NumericField,
  PasswordField, RadioField,
  SelectField,
  TextField
} from "./fields/FormFields";
import {useFormRenderContext} from "./context/FormRenderProvider";

export interface FormProps<F> extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  hideForm?: boolean;
  value?: F;
  onStateChange?: (value: F) => void;
  onFieldChange?: (field: EnhancedField<any, any>) => void;
  children: ReactNode;
}

export const Form = <F,>({className, hideForm, value, onStateChange, onFieldChange, children, ...other}: FormProps<F>) => {
  return (
    hideForm ? (
        <FormProvider value={value} onChange={onStateChange} onFieldChange={onFieldChange}>
          {children}
        </FormProvider>
      ) : (
      <form className={className} {...other}>
        <FormProvider value={value} onChange={onStateChange} onFieldChange={onFieldChange}>
          {children}
        </FormProvider>
      </form>
    )
  )
}

Form.FormField = FormField;
Form.SelectField = SelectField;
Form.TextField = TextField;
Form.PasswordField = PasswordField;
Form.CheckBoxField = CheckBoxField;
Form.RadioField = RadioField;
Form.NumericField = NumericField;
Form.DateField = DateField;

Form.Field = AppFormField;
Form.Select = AppSelectField;
Form.Text = AppTextField;
Form.Password = AppPasswordField;
Form.CheckBox = AppCheckBoxField;
Form.Radio = AppRadioField;
Form.Numeric = AppNumericField;
Form.Date = AppDateField;

export interface AppFormSubmitProps extends BaseFormSubmitProps {
  renderer: string;
}

Form.ButtonSubmit = ({children, ...props}: FormSubmitProps) => (
  <FormSubmit {...props} propsGenerator={getButtonSubmitProps}>
    {children}
  </FormSubmit>
);

Form.Submit = ({renderer, ...props}: AppFormSubmitProps) => {
  const {renderSubmit} = useFormRenderContext();
  return (
    <FormSubmit {...props} propsGenerator={getButtonSubmitProps}>
      {(props) => renderSubmit(renderer, props)}
    </FormSubmit>
  );
}