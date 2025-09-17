import {JSX, useState} from "react";
import {EnhancedField, useFieldsContext, setNestedValue} from "@sparkui/react-field";
import {ButtonProps} from "@sparkui/react-theme";
import {isDefined} from "@sparkui/react-utils";

export interface SubmitChildrenProps<FormData, CustomProps> {
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  props?: ButtonProps;
  params?: CustomProps;
}

export interface BaseFormSubmitProps<FormData, CustomProps> {
  onSubmit: (data: FormData) => Promise<void>;
  onError?: (error: Error) => void;
  params?: CustomProps;
  props?: ButtonProps;
  disabled?: (fields: EnhancedField<any, any>[]) => boolean;
  excludeNonDefinedArrayItems?: boolean;
}

export interface FormSubmitProps<FormData, CustomProps> extends BaseFormSubmitProps<FormData, CustomProps> {
  children: (props: SubmitChildrenProps<FormData, CustomProps>) => JSX.Element;
}

export const FormSubmit = <FormData, CustomProps>(
  {
    onSubmit,
    onError,
    children,
    props,
    params,
    excludeNonDefinedArrayItems = true,
    disabled = () => false
  }: FormSubmitProps<FormData, CustomProps>
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

  const removeNonDefinedValuesFromArrays = (target: any): FormData=> {
    if (!isDefined(target)) {
      return undefined as FormData;
    } else if (Array.isArray(target)) {
      return target.filter(isDefined).map(removeNonDefinedValuesFromArrays) as FormData;
    } else if (typeof target === 'object') {
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          target[key] = removeNonDefinedValuesFromArrays(target[key]);
        }
      }
    }
    return target;
  }

  const onBeforeSubmit = async () => {
    const invalid = getInvalidFields().find(() => true);
    if (invalid) {
      focusField(invalid);
    } else {
      setLoading(true);
      try {
        const data = fields.reduce((previousValue, field) => ({
          ...previousValue,
          ...setNestedValue(previousValue, field.param ?? '', toValue(field))
        }), {}) as FormData;
        await onSubmit(excludeNonDefinedArrayItems ? removeNonDefinedValuesFromArrays(data) : data);
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
        disabled: loading || disabled(fields),
        type: "button",
      },
    }
  ));
}