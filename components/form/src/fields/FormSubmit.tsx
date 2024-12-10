import {JSX, useState} from "react";
import {EnhancedField, useFieldsContext, setNestedValue} from "@sparkui/react-field";
import {ButtonProps} from "@sparkui/react-theme";

export type Submit = <T,>(data: T) => Promise<void>;

export interface SubmitChildrenProps<CustomProps> {
  onSubmit: Submit;
  loading: boolean;
  props?: ButtonProps;
  params?: CustomProps;
}

export interface BaseFormSubmitProps<CustomProps> {
  onSubmit: Submit;
  onError?: (error: Error) => void;
  params?: CustomProps;
  props?: ButtonProps;
}

export interface FormSubmitProps<CustomProps> extends BaseFormSubmitProps<CustomProps> {
  children: (props: SubmitChildrenProps<CustomProps>) => JSX.Element;
}

export const FormSubmit = <CustomProps,>(
  {
    onSubmit,
    onError,
    children,
    props,
    params,
  }: FormSubmitProps<CustomProps>
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
        onError && onError(new Error(`${error}`));
      } finally {
        setLoading(false);
      }
    }
  }

  const element = {
    onSubmit: onBeforeSubmit,
    loading,
    params,
  };

  return (children(
    {
      ...(props ?? {}),
      ...element,
      props: {
        onClick: onBeforeSubmit,
        disabled: loading,
        type: "button",
      },
    }
  ));
}