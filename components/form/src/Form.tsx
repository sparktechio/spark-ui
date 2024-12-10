import React, {cloneElement, FormHTMLAttributes, JSX, MutableRefObject, ReactElement, ReactNode, useRef} from "react";
import {BaseFormSubmitProps, FormSubmit, SubmitChildrenProps} from "./fields/FormSubmit";
import {ButtonProps, Renderer} from "@sparkui/react-theme";
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
import {Renderers} from "@sparkui/react-theme/dist/shared/Renderers";

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

export interface AppFormSubmitProps<CustomProps> extends BaseFormSubmitProps<CustomProps> {
  renderer?: string;
  children?: ((props: SubmitChildrenProps<CustomProps>) => JSX.Element) | ReactElement<ButtonProps>;
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

Form.Submit = <CustomProps,>({renderer = Renderers.BUTTON_PRIMARY, children, ...props}: AppFormSubmitProps<CustomProps>) => {
  if (children && typeof children === "function") {
    return (
      <FormSubmit {...props}>
        {children}
      </FormSubmit>
    )
  } else if (children) {
    return (
      <FormSubmit {...props}>
        {({props}) => cloneElement(children, { ...props })}
      </FormSubmit>
    )
  }
  return (
    <FormSubmit {...props}>
      {(props) => <Renderer name={renderer} props={props}/>}
    </FormSubmit>
  );
}