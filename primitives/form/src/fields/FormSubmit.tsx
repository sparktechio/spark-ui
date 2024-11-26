import {ButtonHTMLAttributes, JSX, useState} from "react";
import {useFormContext} from "../context/FormProvider";
import {EnhancedField, Field} from "./FormField";

export type Submit = <T,>(data: T) => Promise<void>;

export interface FormSubmitProps<B> {
  onSubmit: Submit;
  onError?: (error: unknown) => void;
  children: (props: B) => JSX.Element;
}

export const validateFormField = ({ required, pattern, value, validate = () => true }: Field<any>) => {
  if (required) {
    if (!value) {
      return false;
    }
    return validate(value) && (pattern ? pattern.test(value) : /.+/.test(value));
  } else {
    if (value && value !== "") {
      return validate(value) && (pattern ? pattern.test(value) : true);
    } else {
      return validate(value);
    }
  }
};

export const FormSubmit = <B, >(
  {
    onSubmit,
    onError,
    children,
  }: FormSubmitProps<B>
) => {
  const [loading, setLoading] = useState(false);
  const {fields, setField} = useFormContext();

  const setNestedValue = (target: any, key: string, value: any) => {
    const keys = key.split('.');
    let currentTarget = target;
    for (let index = 0; index < keys.length - 1; index++) {
      const nestedKey = keys[index];
      if (!currentTarget[nestedKey] || typeof currentTarget[nestedKey] !== 'object') {
        currentTarget[nestedKey] = {};
      }
      currentTarget = currentTarget[nestedKey];
    }
    currentTarget[keys[keys.length - 1]] = value;
    return target;
  }

  const focusInvalid = (invalid: EnhancedField<any, any>) => {
    const ref = invalid.reference;
    if (ref?.current) {
      ref.current.focus();
      if (ref.current.scrollIntoView) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  const onBeforeSubmit = async () => {
    const invalid = fields.map(field => {
      const valid = validateFormField(field);
      if (!valid) {
        const newField = {...field, error: true};
        setField(newField);
        return newField;
      }
      return field;
    }).find(item => item.error);
    if (invalid) {
      focusInvalid(invalid);
    } else {
      setLoading(true);
      try {
        await onSubmit(
          fields.reduce((previousValue, currentValue) => ({
            ...previousValue,
            ...setNestedValue(previousValue, currentValue.param, currentValue.value)
          }), {})
        );
      } catch (error: unknown) {
        onError && onError(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (children({
    onClick: onBeforeSubmit,
    disabled: loading,
    type: "button"
  } as B));
}

export const FormButtonSubmit = FormSubmit<ButtonHTMLAttributes<HTMLButtonElement>>;