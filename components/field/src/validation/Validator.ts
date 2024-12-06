import {Field} from "../fields/BaseField";
import {isDefined} from "@sparkui/react-utils";

export enum ValidationError {
  REQUIRED = "REQUIRED",
  PATTERN = "PATTERN",
  MIN_LENGTH = "MIN_LENGTH",
  MAX_LENGTH = "MAX_LENGTH",
  MIN_VALUE = "MIN_VALUE",
  MAX_VALUE = "MAX_VALUE",
  CUSTOM = "CUSTOM",
}

export const validateFormField = <T,>(
  {
    required,
    pattern,
    minLength,
    maxLength,
    min,
    max,
    value,
    validate = () => true
  }: Field<T>
) => {
  const errors: ValidationError[] = [];
  if (required && (!isDefined(value) || value === '')) {
    errors.push(ValidationError.REQUIRED);
  }

  if (required || (value && value !== "")) {
    if (pattern && !pattern.test(`${value}`)) {
      errors.push(ValidationError.PATTERN);
    }

    if (validate && !validate(value)) {
      errors.push(ValidationError.CUSTOM);
    }

    if (isDefined(minLength) && minLength > `${value}`.length) {
      errors.push(ValidationError.MIN_LENGTH);
    }

    if (isDefined(maxLength) && maxLength < `${value}`.length) {
      errors.push(ValidationError.MAX_LENGTH);
    }

    if (isDefined(min) && (!isDefined(value) || isNaN(value as number) || (min > (value as number)))) {
      errors.push(ValidationError.MIN_VALUE);
    }

    if (isDefined(max) && (!isDefined(max) || isNaN(max as number) || (max < (value as number)))) {
      errors.push(ValidationError.MAX_VALUE);
    }
  }
  return errors;
};