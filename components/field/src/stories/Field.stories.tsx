import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef} from 'react';
import {
  CheckBoxField, DateField, EmailField,
  NumericField,
  PasswordField,
  RadioField,
  TextAreaField,
  TextField
} from "../fields/Fields";
import {Theme} from "./Theme";
import {FieldController} from "../context/FieldsProvider";
import {BaseField} from "../fields/BaseField";
import { BootstrapTheme } from '@sparkui/react-theme';


export const Text = () =>  (
  <BootstrapTheme>
    <TextField
      params={{
        label: 'Name',
        input: {
          placeholder: "Name"
        }
      }}
    />
  </BootstrapTheme>
);

export const Email = () =>  (
  <BootstrapTheme>
    <EmailField
      params={{
        label: 'Email',
        input: {
          placeholder: "Email"
        }
      }}
    />
  </BootstrapTheme>
);

export const CheckBox = () =>  (
  <BootstrapTheme>
    <CheckBoxField
      params={{
        input: {placeholder: "New"},
        label: "New"
      }}
    />
  </BootstrapTheme>
);

export const Password = () =>  (
  <BootstrapTheme>
    <PasswordField
      pattern={/^[0-9\-+\/?]+$/}
      params={{
        label: "Secret",
        input: {
          placeholder: "Secret"
        }
      }}
    />
  </BootstrapTheme>
);

export const RadioSet = () =>  (
  <BootstrapTheme>
    <RadioField
      params={[
        {key: 'red', label: 'Red'},
        {key: 'blue', label: 'Blue'},
        {key: 'green', label: 'Green'},
      ]}
    />
  </BootstrapTheme>
);

export const TextArea = () =>  (
  <BootstrapTheme>
    <TextAreaField
      params={{
        placeholder: "Description",
        label: "Description"
      }}
    />
  </BootstrapTheme>
);

export const Numeric = () =>  (
  <BootstrapTheme>
    <NumericField
      params={{
        label: "Age",
        input: {
          placeholder: "Age"
        }
      }}
    />
  </BootstrapTheme>
);

export const IsoDate = () =>  (
  <BootstrapTheme>
    <DateField
      required={true}
      formatOutputValue={(date?: Date) => date?.toISOString()}
      params={{
        label: "Created",
        input: {
          placeholder: "Created"
        }
      }}
    />
  </BootstrapTheme>
);

export const DynamicValue = () =>  {
  const ref = useRef<FieldController>();

  useEffect(() => {
    setTimeout(() => {
      ref.current?.setValue(22);
    }, 2000);
    setTimeout(() => {
      console.log(ref.current?.isValid(true));
    }, 4000);
  }, []);

  return (
    <Theme>
      <NumericField
        fieldControllerRef={ref}
        renderer="my-input"
        min={44}
        params={{
          placeholder: "Age"
        }}
      />
    </Theme>
  )
};

export default {
  title: 'Components/Field',
  component: BaseField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};