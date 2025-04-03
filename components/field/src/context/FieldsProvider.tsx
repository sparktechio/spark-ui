"use client"

import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useContext, useState,
} from "react";
import {EnhancedField, FieldProps} from "../fields/BaseField";
import {validateFormField} from "../validation/Validator";
import {isDefined} from "@sparkui/react-utils";

export interface FieldsController<F> {
  isValid: (touch?: boolean) => boolean;
  getInvalidFields: (touch?: boolean) => EnhancedField<any, any>[];
  setValue: (value: F) => void;
  getValue: () => F;
  setFieldValue: (param: string, value: any) => void;
}

export interface FieldController {
  isValid: (touch?: boolean) => boolean;
  getInvalidField: (touch?: boolean) => EnhancedField<any, any> | undefined;
  setValue: (value: any) => void;
  getValue: () => any;
}

export interface FieldsContextProps {
  name: string;
  onBeforeSubmit: (onError: (error: Error) => void, excludeNonDefinedArrayItems: boolean) => Promise<void> | void;
  submitting: boolean;
  setSubmitting: (value: boolean) => void;
  fields: EnhancedField<any, any>[];
  focusField: (field: EnhancedField<any, any>) => void;
  setField: (field: EnhancedField<any, any>, trigger?: (value: FieldProps<any>) => void) => void;
  initField: (field: FieldProps<any>, ref: RefObject<any>) => EnhancedField<any, any>;
  getInvalidFields: (touch?: boolean) => EnhancedField<any, any>[];
  registerField: (field: EnhancedField<any, any>) => void;
  unRegisterField: (name: string) => void;
}

export interface FieldsContextProviderProps<F> {
  value?: F;
  onSubmit?: () => Promise<void> | void;
  onChange?: (value: F) => void;
  fieldControllerRef?: MutableRefObject<FieldController | undefined>;
  fieldsControllerRef?: MutableRefObject<FieldsController<F> | undefined>;
  onFieldChange?: (field: EnhancedField<any, any>) => void;
  children: ReactNode;
}

export const FieldsContext = createContext<FieldsContextProps>({
  name: 'init',
  fields: [],
  onBeforeSubmit: () => undefined,
  submitting: false,
  setSubmitting: () => ({}),
  focusField: () => ({}),
  setField: () => ({}),
  initField: () => ({} as EnhancedField<any, any>),
  getInvalidFields: () => [],
  registerField: () => ({}),
  unRegisterField: () => ({}),
});

export const useFieldsContext = () => useContext(FieldsContext);
export const hasFieldsContext = () => {
  const context = useContext(FieldsContext);
  return isDefined(context) && context.name != 'init';
};

export const StandaloneFieldProvider = (
  {
    value,
    onFieldChange,
    fieldControllerRef,
    children
  }: FieldsContextProviderProps<any>
) => {
  const [submitting, setSubmitting] = useState(false);
  const [standaloneField, setStandaloneField] = useState<EnhancedField<any, any> | undefined>(undefined);

  const focusField = (invalid: EnhancedField<any, any>) => {
    const ref = invalid.reference;
    if (ref?.current) {
      ref.current.focus();
      if (ref.current.scrollIntoView) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  if (fieldControllerRef) {
    fieldControllerRef.current = {
      isValid: (touch) => !!getFirstInvalidField(touch),
      getInvalidField: (touch) => getFirstInvalidField(touch),
      getValue: () => standaloneField?.value,
      setValue: (value: any) => {
        setStandaloneField(standaloneField => standaloneField ? {...standaloneField, value} : standaloneField);
      },
    }
  }

  const setField = (field: EnhancedField<any, any>, trigger?: (value: FieldProps<any>) => void) => {
    if (trigger) {
      trigger(field);
    }
    setStandaloneField(field);
    if (onFieldChange) {
      onFieldChange(field);
    }
  }

  const initField = (field: FieldProps<any>, reference: RefObject<any>) => {
    if (standaloneField) {
      return standaloneField;
    } else {
      return {
        ...field,
        reference,
        value: field.value ?? value,
        errors: [],
      }
    }
  }

  const registerField = (field: EnhancedField<any, any>) => {
    setStandaloneField((standaloneField) => {
      if (standaloneField) {
        return standaloneField;
      } else {
        return field;
      }
    });
  };

  const unRegisterField = () => {
    setStandaloneField(undefined);
  };

  const getFirstInvalidField = (touch = true) => {
    return getInvalidFields(touch).find(item => item.errors.length > 0);
  }

  const getInvalidFields = (touch = true) => {
    if (standaloneField) {
      const errors = validateFormField(standaloneField, [standaloneField]);
      if (errors.length > 0) {
        if (touch) {
          const newField = {...standaloneField, errors};
          setStandaloneField(newField);
          return [newField];
        }
      }
    }
    return [];
  }

  return (
    <FieldsContext.Provider
      value={{
        name: 'standalone',
        fields: standaloneField ? [standaloneField] : [],
        setField,
        initField,
        focusField,
        getInvalidFields,
        registerField,
        unRegisterField,
        onBeforeSubmit: () => undefined,
        submitting,
        setSubmitting,
      }}
    >
      {children}
    </FieldsContext.Provider>
  );
};
