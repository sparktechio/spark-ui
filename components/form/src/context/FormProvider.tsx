import React, {createContext, ReactNode, RefObject, useContext, useState} from "react";
import {EnhancedField, Field} from "../fields/FormField";

export interface FormContextProps {
  fields: EnhancedField<any, any>[];
  setField: (field: EnhancedField<any, any>) => void;
  getField: (field: Field<any>, ref: RefObject<any>) => any;
  registerField: (field: EnhancedField<any, any>) => void;
  unRegisterField: (name: string) => void;
}

export interface FormContextProviderProps<F> {
  value?: F;
  children: ReactNode;
}

export const FormContext = createContext<FormContextProps>({
  fields: [],
  setField: () => ({}),
  getField: () => ({}),
  registerField: () => ({}),
  unRegisterField: () => ({}),
});

export const useFormContext = () => useContext(FormContext);

export const FormProvider = <F,>(
  {value = {} as F, children}: FormContextProviderProps<F>
) => {
  const [fields, setFields] = useState<EnhancedField<any, any>[]>([]);

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
    setFields((fields) => [...fields.filter((item) => item.name !== field.name), {...field}]);
  }

  const getField = (field: Field<any>, reference: RefObject<any>) => {
    const item = fields.find(item => item.name === field.name);
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
      const hasField = fields.find((item) => item.name === field.name);
      if (hasField) {
        return fields;
      } else {
        return [...fields, field];
      }
    });
  };

  const unRegisterField = (field: string) => {
    setFields((prev) => prev.filter((item) => item.name !== field));
  };

  return (
    <FormContext.Provider value={{ fields, setField, getField, registerField, unRegisterField }}>
      {children}
    </FormContext.Provider>
  );
};
