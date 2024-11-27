import {JSX, RefObject, useEffect, useRef} from "react";
import {useFormContext} from "../context/FormProvider";
import {validateFormField, ValidationError} from "../validation/Validator";

export interface Field<V> {
  name: string;
  param: string,

  value?: V;
  label?: string,

  validate?: (value?: V) => boolean,
  pattern?: RegExp,
  required?: boolean,
  maxLength?: number,
  minLength?: number,
  min?: number,
  max?: number,
}

export interface ControlledElement {
  focus(options?: FocusOptions): void;

  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}

export interface EnhancedField<V, I extends ControlledElement> extends Field<V> {
  reference: RefObject<I>;
  touched?: boolean;
  errors: ValidationError[];
}

export interface ElementProps<V, I> {
  onChange: (value?: V | null) => void;
  onBlur: (value?: V | null) => void;
  validate: () => ValidationError[];
  errors: ValidationError[];
  ref: RefObject<I>;
  name: string;
  value: V;
  props?: any
}

export interface FormFieldProps<V, I> extends Field<V> {
  onChange?: (value: Field<V>) => void;
  children: (props: ElementProps<V, I>) => JSX.Element;
  propsGenerator?: (props: ElementProps<V, I>) => any;
}

export const FormField = <V, I>({onChange, children, propsGenerator, ...fieldProps}: FormFieldProps<V, I>) => {

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

  const element: ElementProps<V, I> = {
    onChange: (value) => setField({...field, value, errors: field.touched ? !validateFormField({...field, value}) : field.errors}),
    validate: () => validateFormField(field),
    onBlur: (value) => setField({...field, value, touched: true, errors: validateFormField({...field, value})}),
    errors: field.errors,
    ref,
    name: field.name,
    value: field.value
  }

  return children({
    ...element,
    props: propsGenerator ? propsGenerator(element) : undefined,
  });
}