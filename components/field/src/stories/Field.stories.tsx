import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef} from 'react';
import {
  CheckBoxField, DateField, EmailField,
  Field,
  NumericField,
  PasswordField,
  RadioField,
  TextAreaField,
  TextField
} from "../fields/Fields";
import {Theme} from "./Theme";
import {FieldController} from "../context/FieldSetProvider";


export const Text = () =>  (
  <Theme>
    <TextField
      renderer="my-input"
      param="name"
      params={{
        placeholder: "Name"
      }}
    />
  </Theme>
);

export const CheckBox = () =>  (
  <Theme>
    <CheckBoxField
      renderer="my-checkbox"
      param="new"
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
      param="secret"
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
      param="color"
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
      param="description"
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
      param="age"
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
      param="created"
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
        param="age"
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
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};