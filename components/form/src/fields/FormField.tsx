import {JSX, RefObject, useEffect, useRef} from "react";
import {useFormContext} from "../context/FormProvider";
import {validateFormField} from "./FormSubmit";

export interface Field<V> {
  name: string;
  param: string,

  value?: V;
  label?: string,
  placeholder?: string,
  className?: string,

  validate?: (value: any) => boolean,
  pattern?: RegExp,
  required?: boolean,
  maxLength?: number
}

export interface ControlledElement {
  focus(options?: FocusOptions): void;

  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}

export interface EnhancedField<V, I extends ControlledElement> extends Field<V> {
  reference: RefObject<I>;
  touched?: boolean;
  error?: boolean;
}

export interface NestedElementProps<V, I> {
  ref: RefObject<I>;
  name: string;
  value: V;
  placeholder?: string;
}

export interface ElementProps<V, I> {
  onChange: (value: V) => void;
  onBlur: (value: V) => void;
  validate: () => boolean;
  error?: boolean;
  element: NestedElementProps<V, I>;
}

export interface FormFieldProps<V, I> extends Field<V> {
  onChange?: (value: Field<V>) => void;
  children: (props: ElementProps<V, I>) => JSX.Element;
}

export const FormField = <V, I>({onChange, children, ...fieldProps}: FormFieldProps<V, I>) => {

  const {setField, getField, registerField, unRegisterField} = useFormContext();

  const ref = useRef<I>(null);
  const field = getField(fieldProps, ref);

  useEffect(
    () => {
      registerField(field);
      return () => {
        unRegisterField(field.name);
      }
    },
    []
  );

  return children({
    onChange: (value) => setField({...field, value, error: field.touched ? !validateFormField({...field, value}) : field.error}),
    validate: () => validateFormField(field),
    onBlur: (value) => setField({...field, value, touched: true, error: !validateFormField({...field, value})}),
    error: field.error,
    element: {
      ref,
      name: field.name,
      value: field.value,
    }
  });
}

export const FormTextField = FormField<string, HTMLInputElement>;
export const FormNumericField = FormField<number, HTMLInputElement>;