import React, {ReactNode} from "react";
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
Form.AppField = AppFormField;
Form.SelectField = SelectField;
Form.AppSelectField = AppSelectField;
Form.TextField = TextField;
Form.AppTextField = AppTextField;
Form.PasswordField = PasswordField;
Form.AppPasswordField = AppPasswordField;
Form.CheckBoxField = CheckBoxField;
Form.AppCheckBoxField = AppCheckBoxField;
Form.RadioField = RadioField;
Form.AppRadioField = AppRadioField;
Form.NumericField = NumericField;
Form.AppNumericField = AppNumericField;
Form.DateField = DateField;
Form.AppDateField = AppDateField;



export interface AppFormSubmitProps extends BaseFormSubmitProps {
  renderer: string;
}

Form.ButtonSubmit = ({children, ...props}: FormSubmitProps) => (
  <FormSubmit {...props} propsGenerator={getButtonSubmitProps}>
    {children}
  </FormSubmit>
);

Form.AppButtonSubmit = ({renderer, ...props}: AppFormSubmitProps) => {
  const {renderSubmit} = useFormRenderContext();
  return (
    <FormSubmit {...props} propsGenerator={getButtonSubmitProps}>
      {(props) => renderSubmit(renderer, props)}
    </FormSubmit>
  );
}