"use client"

import React, {cloneElement, FormHTMLAttributes, JSX, MutableRefObject, ReactElement, ReactNode, useRef, MouseEvent} from "react";
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

export interface FormProps<FormData> extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  hideForm?: boolean;
  value?: FormData;
  fieldsControllerRef?: MutableRefObject<FieldsController<FormData> | undefined>;
  onStateChange?: (value: FormData) => void;
  onFieldChange?: (field: EnhancedField<any, any>) => void;
  children: ReactNode;
}

export const Form = <FormData,>(
  {
    className,
    hideForm,
    value,
    fieldsControllerRef,
    onStateChange,
    onFieldChange,
    children,
    ...other
  }: FormProps<FormData>
) => {
  const ref = useRef<FieldsController<FormData>>();
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

export interface AppFormSubmitProps<FormData, CustomProps> extends BaseFormSubmitProps<FormData, CustomProps> {
  renderer?: string;
  children?: ((props: SubmitChildrenProps<FormData, CustomProps>) => JSX.Element) | ReactElement<ButtonProps>;
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

Form.Submit = <FormData, CustomProps = {}>({renderer = Renderers.BUTTON_PRIMARY, children, ...props}: AppFormSubmitProps<FormData, CustomProps>) => {
  if (children && typeof children === "function") {
    return (
      <FormSubmit {...props}>
        {children}
      </FormSubmit>
    )
  } else if (children) {
    return (
      <FormSubmit {...props}>
        {({props}) => {
          if (children.props.onClick) {
            const onClick = (event: MouseEvent<HTMLButtonElement>) => {
              props?.onClick?.(event);
              children.props.onClick?.(event)
            };
            return cloneElement(children, { ...props, onClick });
          }
          return cloneElement(children, { ...props });
        }}
      </FormSubmit>
    )
  }
  return (
    <FormSubmit {...props}>
      {(props) => <Renderer name={renderer} props={props}/>}
    </FormSubmit>
  );
}