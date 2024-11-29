import { fn } from '@storybook/test';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Form} from "./form";
import {FormControl, FormRenderer, Row} from "./FormRenderer";

const FormElement = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 300px;
`;

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
};

export const Basic = () =>  {
  const value = {personal: {name: '', description: "123", age: 2021}, created: new Date(), status: 'started', color: 'green'};

  const age = {
    required: false,
    minLength: 4,
    maxLength: 4,
    min: 1999,
    max: 2024,
    validate: (value?: number) => value != 2020,
    placeholder: "age",
    param: "personal.age",
  }

  return (
    <FormRenderer>
      <FormElement value={value}>
        <Form.AppTextField
          renderer="my-input"
          param={"personal.name"}
          required={true}
          params={{
            placeholder: "Name"
          }}
        />
        <Form.AppPasswordField
          renderer="my-input"
          param={"secret"}
          pattern={/^[0-9\-+\/?]+$/}
          params={{
            placeholder: "Secret"
          }}
        />
        <Form.AppNumericField
          renderer="my-input"
          param="age"
          params={{
            placeholder: "Age"
          }}
        />
        <Form.AppDateField
          renderer="my-input"
          param="created"
          required={true}
          params={{
            placeholder: "Age"
          }}
        />
        <Form.AppCheckBoxField
          renderer="my-checkbox"
          param={"new"}
          params={{
            input: {placeholder: "Age"},
            label: "New"
          }}
        />
        <Form.AppRadioField
          renderer="my-radio-set"
          param={"color"}
          params={[
            {key: 'red', label: 'Red'},
            {key: 'blue', label: 'Blue'},
            {key: 'green', label: 'Green'},
          ]}
        />
        <Form.TextField param={"personal.description"} required={true} pattern={/^[0-9\-+\/?]+$/}>
          {({props, errors}) => (
            <FormControl>
              <span className="form-label">Digits or special characters only: -+/?</span>
              <input className="form-control" placeholder="Desc" {...props} />
              {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
            </FormControl>
          )}
        </Form.TextField>
        <Form.SelectField param="status" required={true}>
          {({props, errors}) => (
            <FormControl>
              <select className="form-control" placeholder="Color" {...props}>
                <option value="" disabled>Select your option</option>
                <option value="started">Started</option>
                <option value="finished">Finished</option>
              </select>
              {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
            </FormControl>
          )}
        </Form.SelectField>
        <Form.Field<string, HTMLInputElement> param="custom" required={true}>
          {({onChange, onBlur, ref, value, errors}) => (
            <FormControl>
              <input
                className="form-control"
                placeholder="Name"
                type="text"
                ref={ref}
                value={value}
                onChange={({target: {value}}) => onChange(value)}
                onBlur={({target: {value}}) => onBlur(value)}
              />
              {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
            </FormControl>
          )}
        </Form.Field>
        <Form.AppButtonSubmit
          renderer="my-submit"
          onSubmit={async (e) => console.log(e)}
          params={"Submit"}
        />
      </FormElement>
    </FormRenderer>
  );
}
