import React, {
  RefObject,
  useState
} from "react";
import {
  FieldsContext,
  EnhancedField,
  FieldProps,
  FieldsContextProviderProps,
  setNestedValue,
  validateFormField
} from "@sparkui/react-field";
import {isDefined} from "@sparkui/react-utils";

export const FormProvider = <F,>(
  {
    value = {} as F,
    onChange,
    onFieldChange,
    fieldsControllerRef,
    children
  }: FieldsContextProviderProps<F>
) => {
  const [fields, setFields] = useState<EnhancedField<any, any>[]>([]);

  const objectToParams = (input: any, parentKey = '') => {
    let result: {key: string, value: any}[] = [];
    for (const [key, value] of Object.entries(input)) {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result = result.concat(objectToParams(value, currentPath));
      } else if (value !== null && Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item !== 'object' && typeof item !== 'function') {
            result.push({ key: `${currentPath}[${index}]`, value: item });
          } else {
            result = result.concat(objectToParams(item, `${currentPath}[${index}]`))
          }
        });
      } else {
        result.push({ key: currentPath, value: value });
      }
    }
    return result;
  }

  const focusField = (invalid: EnhancedField<any, any>) => {
    const ref = invalid.reference;
    if (ref?.current) {
      ref.current.focus();
      if (ref.current.scrollIntoView) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  if (fieldsControllerRef) {
    fieldsControllerRef.current = {
      isValid: (touch) => !!getFirstInvalidField(touch),
      getInvalidFields: (touch) => getInvalidFields(touch),
      getValue: () => (
        fields.reduce((previousValue, field) => ({
          ...previousValue,
          ...setNestedValue(previousValue, field.param ?? '', field.value)
        }), {}) as F
      ),
      setValue: (value: F) => {
        const dictionary = objectToParams(value);
        setFields(fields => fields.map(field => {
          const requested = dictionary.find(item => item.key === field.param);
          if (requested) {
            return {...field, value: requested.value};
          }
          return field;
        }))
      },
      setFieldValue: (param: string, value: any) => {
        setFields(fields => fields.map(field => {
          if (field.param === param) {
            return {...field, value};
          }
          return field;
        }))
      },
    }
  }

  const getNestedValue = (target: any, key: string, defaultValue: any) => {
    const params = objectToParams(target);
    const item = params.find(item => item.key === key);
    if (isDefined(item)) {
      return item.value ?? defaultValue;
    } else {
      return defaultValue;
    }
  };

  const setField = (field: EnhancedField<any, any>, trigger?: (value: FieldProps<any>) => void) => {
    if (trigger) {
      trigger(field);
    }
    setFields((fields) => {
      const newFields = [...fields.filter((item) => item.param !== field.param), {...field}];
      if (onChange) {
        onChange(
          newFields.reduce((previousValue, currentValue) => ({
            ...previousValue,
            ...setNestedValue(previousValue, currentValue.param ?? '', currentValue.value)
          }), {}) as F
        );
      }
      return newFields;
    });
    if (onFieldChange) {
      onFieldChange(field);
    }
  }

  const initField = (field: FieldProps<any>, reference: RefObject<any>) => {
    const item = fields.find(item => item.param === field.param);
    if (item) {
      return item;
    } else {
      return {
        ...field,
        reference,
        value: getNestedValue(value, field.param ?? '', field.value),
        errors: [],
      }
    }
  }

  const registerField = (field: EnhancedField<any, any>) => {
    setFields((fields) => {
      const hasField = fields.find((item) => item.param === field.param);
      if (hasField) {
        return fields;
      } else {
        return [...fields, field];
      }
    });
  };

  const unRegisterField = (field: string) => {
    setFields((prev) => prev.filter((item) => item.param !== field));
  };

  const getFirstInvalidField = (touch = true) => {
    return getInvalidFields(touch).find(item => item.errors.length > 0);
  }

  const getInvalidFields = (touch = true) => {
    return fields.map(field => {
      const errors = validateFormField(field, fields);
      if (touch && errors.length > 0) {
        const newField = {...field, touched: true, errors};
        setField(newField);
        return newField;
      }
      return {...field, errors};
    }).filter(item => item.errors.length > 0);
  }

  return (
    <FieldsContext.Provider
      value={{
        name: 'form',
        fields,
        setField,
        initField,
        focusField,
        getInvalidFields,
        registerField,
        unRegisterField
      }}
    >
      {children}
    </FieldsContext.Provider>
  );
};
