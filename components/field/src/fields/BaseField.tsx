import {JSX, RefObject, useEffect, useRef} from "react";
import {useFieldsContext} from "../context/FieldsProvider";
import {validateFormField, ValidationError} from "../validation/Validator";

export interface FieldProps<V> {
  param?: string,

  value?: V;
  formatElementValue?: (value?: V) => any;
  formatOutputValue?: (value?: V) => any;
  label?: string,
  disabled?: boolean,

  validate?: (value?: V) => boolean,
  pattern?: RegExp,
  required?: boolean,
  maxLength?: number,
  minLength?: number,
  min?: number,
  max?: number,

  onChange?: (value: FieldProps<V>) => void;
  onBlur?: (value: FieldProps<V>) => void;
}

export interface ControlledElement {
  focus(options?: FocusOptions): void;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}

export interface EnhancedField<V, I extends ControlledElement> extends FieldProps<V> {
  reference: RefObject<I>;
  touched?: boolean;
  errors: ValidationError[];
}

export interface FieldChildrenProps<V, I> {
  onChange: (value?: V | null) => void;
  onBlur: (value?: V | null) => void;
  validate: () => ValidationError[];
  errors: ValidationError[];
  getField: (param: string) => FieldProps<V> | undefined;
  getValue: (param: string) => V | undefined;
  fields: FieldProps<any>[];
  field: FieldProps<any>;
  ref: RefObject<I>;
  formatElementValue?: (value?: V) => any;
  formatOutputValue?: (value?: V) => any;
  disabled?: boolean,
  value?: V;
  params?: any;
  props?: any;
}

export interface BaseFormFieldProps<V, I> extends FieldProps<V> {
  propsGenerator?: (props: FieldChildrenProps<V, I>) => any;
  params?: any;
}

export interface FormFieldProps<V, I> extends BaseFormFieldProps<V, I> {
  children: (props: FieldChildrenProps<V, I>) => JSX.Element;
}

export const BaseField = <V, I>({children, params, propsGenerator, ...fieldProps}: FormFieldProps<V, I>) => {

  const {fields, setField, initField, registerField, unRegisterField} = useFieldsContext();

  const ref = useRef<I>(null);
  const field = initField(fieldProps, ref);

  useEffect(
    () => {
      registerField(field);
      return () => {
        unRegisterField(field.param ?? '');
      }
    },
    []
  );

  const element: FieldChildrenProps<V, I> = {
    onChange: (value) => setField({...field, value, errors: field.touched ? validateFormField({...field, value}) : field.errors}, field.onChange),
    onBlur: (value) => setField({...field, value, touched: true, errors: validateFormField({...field, value})}, field.onBlur),
    validate: () => validateFormField(field),
    errors: field.errors,
    value: field.value,
    formatElementValue: field.formatElementValue,
    formatOutputValue: field.formatOutputValue,
    disabled: field.disabled,
    getField: (param: string) => fields.find(item => item.param === param),
    getValue: (param: string) => fields.find(item => item.param === param)?.value,
    params,
    ref,
    fields,
    field,
  }

  return children({
    ...element,
    props: propsGenerator ? propsGenerator(element) : undefined,
  });
}