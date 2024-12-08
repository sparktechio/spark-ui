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


export const Text = () =>  (
  <Theme>
    <TextField
      renderer="my-input"
      params={{
        placeholder: "Name"
      }}
    />
  </Theme>
);

export const Email = () =>  (
  <Theme>
    <EmailField
      renderer="my-input"
      params={{
        placeholder: "Email"
      }}
    />
  </Theme>
);

export const CheckBox = () =>  (
  <Theme>
    <CheckBoxField
      renderer="my-checkbox"
      params={{
        input: {placeholder: "New"},
        label: "New"
      }}
    />
  </Theme>
);

export const Password = () =>  (
  <Theme>
    <PasswordField
      renderer="my-input"
      pattern={/^[0-9\-+\/?]+$/}
      params={{
        placeholder: "Secret"
      }}
    />
  </Theme>
);

export const RadioSet = () =>  (
  <Theme>
    <RadioField
      renderer="my-radio-set"
      params={[
        {key: 'red', label: 'Red'},
        {key: 'blue', label: 'Blue'},
        {key: 'green', label: 'Green'},
      ]}
    />
  </Theme>
);

export const TextArea = () =>  (
  <Theme>
    <TextAreaField
      renderer="my-textarea"
      params={{
        placeholder: "Description",
        label: "Description"
      }}
    />
  </Theme>
);

export const Numeric = () =>  (
  <Theme>
    <NumericField
      renderer="my-input"
      params={{
        placeholder: "Age"
      }}
    />
  </Theme>
);

export const IsoDate = () =>  (
  <Theme>
    <DateField
      renderer="my-input"
      required={true}
      formatOutputValue={(date?: Date) => date?.toISOString()}
      params={{
        placeholder: "Created"
      }}
    />
  </Theme>
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