import {JSX, RefObject, useEffect, useRef} from "react";
import {useFormContext} from "../context/FormProvider";
import {validateFormField, ValidationError} from "../validation/Validator";

export interface Field<V> {
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

export type Renderer<V, I> = (props: ElementProps<V, I>) => JSX.Element;

export interface ElementProps<V, I> {
  onChange: (value?: V | null) => void;
  onBlur: (value?: V | null) => void;
  validate: () => ValidationError[];
  errors: ValidationError[];
  fields: Field<any>[];
  field: Field<any>;
  ref: RefObject<I>;
  value: V;
  params?: any;
  props?: any;
}

export interface BaseFormFieldProps<V, I> extends Field<V> {
  onChange?: (value: Field<V>) => void;
  propsGenerator?: (props: ElementProps<V, I>) => any;
  params?: any;
}

export interface FormFieldProps<V, I> extends BaseFormFieldProps<V, I> {
  children: (props: ElementProps<V, I>) => JSX.Element;
}

export const FormField = <V, I>({onChange, children, params, propsGenerator, ...fieldProps}: FormFieldProps<V, I>) => {

  const {setField, getField, fields, registerField, unRegisterField} = useFormContext();

  const ref = useRef<I>(null);
  const field = getField(fieldProps, ref);

  useEffect(
    () => {
      registerField(field);
      return () => {
        unRegisterField(field.param);
      }
    },
    []
  );

  const element: ElementProps<V, I> = {
    onChange: (value) => setField({...field, value, errors: field.touched ? validateFormField({...field, value}) : field.errors}),
    validate: () => validateFormField(field),
    onBlur: (value) => setField({...field, value, touched: true, errors: validateFormField({...field, value})}),
    errors: field.errors,
    value: field.value,
    params,
    ref,
    fields,
    field
  }

  return children({
    ...element,
    props: propsGenerator ? propsGenerator(element) : undefined,
  });
}