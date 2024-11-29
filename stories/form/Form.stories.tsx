import { fn } from '@storybook/test';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Form} from "./form";
import {FormControl, FormRenderer} from "./FormRenderer";


const sate = {personal: {name: '', description: "123", age: 2021}, created: new Date(), status: 'started', color: 'green'};

export const Basic = () =>  (
  <FormRenderer>
    <Form value={sate} className="container row">
      <Form.Text
        renderer="my-input"
        param={"personal.name"}
        params={{
          placeholder: "Name"
        }}
      />
      <Form.CheckBox
        renderer="my-checkbox"
        param={"new"}
        params={{
          input: {placeholder: "Age"},
          label: "New"
        }}
      />
      <Form.Password
        renderer="my-input"
        param={"secret"}
        pattern={/^[0-9\-+\/?]+$/}
        params={{
          placeholder: "Secret"
        }}
      />
      <Form.Radio
        renderer="my-radio-set"
        param={"color"}
        params={[
          {key: 'red', label: 'Red'},
          {key: 'blue', label: 'Blue'},
          {key: 'green', label: 'Green'},
        ]}
      />
      <Form.Numeric
        renderer="my-input"
        param="age"
        params={{
          placeholder: "Age"
        }}
      />
      <Form.Date
        renderer="my-input"
        param="created"
        required={true}
        params={{
          placeholder: "Age"
        }}
      />
      <Form.FormField<string, HTMLInputElement> param="custom" required={true}>
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
      </Form.FormField>
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
      <Form.TextField param={"personal.description"} required={true} pattern={/^[0-9\-+\/?]+$/}>
        {({props, errors}) => (
          <FormControl>
            <span className="form-label">Digits or special characters only: -+/?</span>
            <input className="form-control" placeholder="Desc" {...props} />
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.TextField>
      <div className="col-12">
        <Form.Submit
          renderer="my-submit"
          onSubmit={async (e) => console.log(e)}
          params={"Submit"}
        />
      </div>
    </Form>
  </FormRenderer>
);

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