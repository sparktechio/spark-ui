import React, {FormHTMLAttributes, MutableRefObject, ReactNode, useRef} from "react";
import {FormController, FormProvider} from "./context/FormProvider";
import {EnhancedField, FormField} from "./fields/FormField";
import {BaseFormSubmitProps, FormSubmit, FormSubmitProps} from "./fields/FormSubmit";
import {
  getButtonSubmitProps
} from "./utils/Utils";
import {
  AppCheckBoxField, AppDateField, AppEmailField, AppFilesField,
  AppFormField, AppNumericField,
  AppPasswordField, AppRadioField,
  AppSelectField, AppTextAreaField,
  AppTextField, CheckBoxField, DateField, EmailField, FilesField, NumericField,
  PasswordField, RadioField,
  SelectField, TextAreaField,
  TextField
} from "./fields/FormFields";
import {useThemeContext} from "@sparkui/react-theme";

export interface FormProps<F> extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  hideForm?: boolean;
  value?: F;
  controllerRef?: MutableRefObject<FormController<F> | undefined>;
  onStateChange?: (value: F) => void;
  onFieldChange?: (field: EnhancedField<any, any>) => void;
  children: ReactNode;
}

export const Form = <F,>(
  {
    className,
    hideForm,
    value,
    controllerRef,
    onStateChange,
    onFieldChange,
    children,
    ...other
  }: FormProps<F>
) => {
  const ref = useRef<FormController<F>>();
  return (
    hideForm ? (
        <FormProvider value={value} onChange={onStateChange} onFieldChange={onFieldChange} controllerRef={controllerRef ?? ref}>
          {children}
        </FormProvider>
      ) : (
      <form className={className} {...other}>
        <FormProvider value={value} onChange={onStateChange} onFieldChange={onFieldChange} controllerRef={controllerRef ?? ref}>
          {children}
        </FormProvider>
      </form>
    )
  )
}

Form.FormField = FormField;
Form.SelectField = SelectField;
Form.TextField = TextField;
Form.TextAreaField = TextAreaField;
Form.EmailField = EmailField;
Form.FilesField = FilesField;
Form.PasswordField = PasswordField;
Form.CheckBoxField = CheckBoxField;
Form.RadioField = RadioField;
Form.NumericField = NumericField;
Form.DateField = DateField;

Form.Field = AppFormField;
Form.Select = AppSelectField;
Form.Text = AppTextField;
Form.TextArea = AppTextAreaField;
Form.Email = AppEmailField;
Form.Files = AppFilesField;
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
  const {render} = useThemeContext();
  return (
    <FormSubmit {...props} propsGenerator={getButtonSubmitProps}>
      {(props) => render(renderer, props)}
    </FormSubmit>
  );
}