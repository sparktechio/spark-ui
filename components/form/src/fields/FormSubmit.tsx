import {JSX, useState} from "react";
import {useFormContext} from "../context/FormProvider";
import {EnhancedField} from "./FormField";
import {validateFormField} from "../validation/Validator";
import {setNestedValue} from "../utils/ValueGenerator";

export type Submit = <T,>(data: T) => Promise<void>;

export interface SubmitChildrenProps {
  onSubmit: Submit;
  loading: boolean;
  props?: any;
}

export interface FormSubmitProps {
  onSubmit: Submit;
  onError?: (error: unknown) => void;
  propsGenerator?: (props: SubmitChildrenProps) => any;
  children: (props: SubmitChildrenProps) => JSX.Element;
}

export const FormSubmit = (
  {
    onSubmit,
    onError,
    propsGenerator,
    children,
  }: FormSubmitProps
) => {
  const [loading, setLoading] = useState(false);
  const {fields, setField} = useFormContext();

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
      const errors = validateFormField(field);
      if (errors.length > 0) {
        const newField = {...field, errors};
        setField(newField);
        return newField;
      }
      return field;
    }).find(item => item.errors.length > 0);
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

  const element = {
    onSubmit: onBeforeSubmit,
    loading,
  }

  return (children(
    {
      ...element,
      props: propsGenerator ? propsGenerator(element) : undefined,
    }
  ));
}