import React, {FormHTMLAttributes, MutableRefObject, ReactNode, useRef} from "react";
import {BaseFormSubmitProps, FormSubmit, FormSubmitProps, SubmitChildrenProps} from "./fields/FormSubmit";
import {useThemeContext} from "@sparkui/react-theme";
import {
  CheckBoxField, DateField,
  EmailField,
  Field,
  FieldsController,
  FilesField, NumericField, PasswordField, RadioField,
  SelectField,
  TextAreaField,
  TextField,
  EnhancedField
} from "@sparkui/react-field";
import {FormProvider} from "./context/FormProvider";

export interface FormProps<F> extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  hideForm?: boolean;
  value?: F;
  fieldsControllerRef?: MutableRefObject<FieldsController<F> | undefined>;
  onStateChange?: (value: F) => void;
  onFieldChange?: (field: EnhancedField<any, any>) => void;
  children: ReactNode;
}

export const Form = <F,>(
  {
    className,
    hideForm,
    value,
    fieldsControllerRef,
    onStateChange,
    onFieldChange,
    children,
    ...other
  }: FormProps<F>
) => {
  const ref = useRef<FieldsController<F>>();
  const provider = (
    <FormProvider
      value={value}
      onChange={onStateChange}
      onFieldChange={onFieldChange}
      fieldsControllerRef={fieldsControllerRef ?? ref}
    >
      {children}
    </FormProvider>
  );

  return (
    hideForm ? (provider) : (
      <form className={className} {...other}>
        {provider}
      </form>
    )
  )
}

export const getButtonSubmitProps = ({onSubmit, loading}: SubmitChildrenProps) => {
  return {
    onClick: onSubmit,
    disabled: loading,
    type: "button",
  }
}

export interface AppFormSubmitProps extends BaseFormSubmitProps {
  renderer: string;
}

Form.Field = Field;
Form.Select = SelectField;
Form.Text = TextField;
Form.TextArea = TextAreaField;
Form.Email = EmailField;
Form.Files = FilesField;
Form.Password = PasswordField;
Form.CheckBox = CheckBoxField;
Form.Radio = RadioField;
Form.Numeric = NumericField;
Form.Date = DateField;

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