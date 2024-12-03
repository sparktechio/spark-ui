import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useContext,
  useState
} from "react";
import {EnhancedField, Field} from "../fields/FormField";
import {setNestedValue} from "../utils/ValueGenerator";
import {validateFormField} from "../validation/Validator";

export interface FormContextProps {
  fields: EnhancedField<any, any>[];
  focusField: (field: EnhancedField<any, any>) => void;
  setField: (field: EnhancedField<any, any>) => void;
  getField: (field: Field<any>, ref: RefObject<any>) => EnhancedField<any, any>;
  getFirstInvalidField: (touch?: boolean) => EnhancedField<any, any> | undefined;
  registerField: (field: EnhancedField<any, any>) => void;
  unRegisterField: (name: string) => void;
}

export interface FormController<F> {
  isValid: (touch?: boolean) => boolean;
  setValue: (value: F) => void;
  setFieldValue: (param: string, value: any) => void;
}

export interface FormContextProviderProps<F> {
  value?: F;
  onChange?: (value: F) => void;
  controllerRef: MutableRefObject<FormController<F> | undefined>;
  onFieldChange?: (field: EnhancedField<any, any>) => void;
  children: ReactNode;
}

export const FormContext = createContext<FormContextProps>({
  fields: [],
  focusField: () => ({}),
  setField: () => ({}),
  getField: () => ({} as EnhancedField<any, any>),
  getFirstInvalidField: () => undefined,
  registerField: () => ({}),
  unRegisterField: () => ({}),
});

export const useFormContext = () => useContext(FormContext);

export const FormProvider = <F,>(
  {
    value = {} as F,
    onChange,
    onFieldChange,
    controllerRef,
    children
  }: FormContextProviderProps<F>
) => {
  const [fields, setFields] = useState<EnhancedField<any, any>[]>([]);

  const objectToDictionary = (input: any, parentKey = '') => {
    let result: {key: string, value: any}[] = [];
    for (const [key, value] of Object.entries(input)) {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result = result.concat(objectToDictionary(value, currentPath));
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

  controllerRef.current = {
    isValid: (touch) => !!getFirstInvalidField(touch),
    setValue: (value: F) => {
      const dictionary = objectToDictionary(value);
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

  const getNestedValue = (target: any, key: string, defaultValue: any) => {
    const keys = key.split(".");
    let currentTarget = target;
    for (let index = 0; index < keys.length; index++) {
      const nestedKey = keys[index];
      if (
        !currentTarget ||
        typeof currentTarget !== "object" ||
        !(nestedKey in currentTarget)
      ) {
        return defaultValue;
      }
      currentTarget = currentTarget[nestedKey];
    }
    return currentTarget !== undefined ? currentTarget : defaultValue;
  };

  const setField = (field: EnhancedField<any, any>) => {
    setFields((fields) => {
      const newFields = [...fields.filter((item) => item.param !== field.param), {...field}];
      if (onChange) {
        onChange(
          newFields.reduce((previousValue, currentValue) => ({
            ...previousValue,
            ...setNestedValue(previousValue, currentValue.param, currentValue.value)
          }), {}) as F
        );
      }
      return newFields;
    });
    if (onFieldChange) {
      onFieldChange(field);
    }
  }

  const getField = (field: Field<any>, reference: RefObject<any>) => {
    const item = fields.find(item => item.param === field.param);
    if (item) {
      return item;
    } else {
      return {
        ...field,
        reference,
        value: getNestedValue(value, field.param, field.value),
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
    return fields.map(field => {
      const errors = validateFormField(field);
      if (touch && errors.length > 0) {
        const newField = {...field, touched: true, errors};
        setField(newField);
        return newField;
      }
      return field;
    }).find(item => item.errors.length > 0);
  }

  return (
    <FormContext.Provider value={{ fields, setField, getField, focusField, getFirstInvalidField, registerField, unRegisterField }}>
      {children}
    </FormContext.Provider>
  );
};
