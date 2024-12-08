import {JSX, useState} from "react";
import {EnhancedField, useFieldsContext, setNestedValue} from "@sparkui/react-field";

export type Submit = <T,>(data: T) => Promise<void>;

export interface SubmitChildrenProps {
  onSubmit: Submit;
  loading: boolean;
  props?: any;
  params?: any;
}

export interface BaseFormSubmitProps {
  onSubmit: Submit;
  onError?: (error: unknown) => void;
  params?: any;
  propsGenerator?: (props: SubmitChildrenProps) => any;
}

export interface FormSubmitProps extends BaseFormSubmitProps {
  children: (props: SubmitChildrenProps) => JSX.Element;
}

export const FormSubmit = (
  {
    onSubmit,
    onError,
    propsGenerator,
    children,
    params,
  }: FormSubmitProps
) => {
  const [loading, setLoading] = useState(false);
  const {fields, getInvalidFields, focusField} = useFieldsContext();

  const toValue = (
    {
      formatOutputValue = (value) => value,
      value
    }: EnhancedField<any, any>
  ) => {
    return formatOutputValue(value);
  }

  const onBeforeSubmit = async () => {
    const invalid = getInvalidFields().find(() => true);
    if (invalid) {
      focusField(invalid);
    } else {
      setLoading(true);
      try {
        await onSubmit(
          fields.reduce((previousValue, field) => ({
            ...previousValue,
            ...setNestedValue(previousValue, field.param ?? '', toValue(field))
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
    params,
  }

  return (children(
    {
      ...element,
      props: propsGenerator ? propsGenerator(element) : undefined,
    }
  ));
}