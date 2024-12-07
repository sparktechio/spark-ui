import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef} from "react";
import {FormControl, FormRenderer} from "./FormRenderer";
import {Form} from "../Form";
import {FieldsController} from "@sparkui/react-field";

const sate = {personal: {name: '', description: "123", age: 2021}, created: new Date(), status: 'started', color: 'green'};

export const Text = () =>  (
  <FormRenderer>
    <Form value={{name: ''}} className="container row">
      <Form.Text
        renderer="my-input"
        param="name"
        params={{
          placeholder: "Name"
        }}
      />
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);

export const CheckBox = () =>  (
  <FormRenderer>
    <Form value={{new: false}} className="container row">
      <Form.CheckBox
        renderer="my-checkbox"
        param="new"
        params={{
          input: {placeholder: "New"},
          label: "New"
        }}
      />
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);

export const Password = () =>  (
  <FormRenderer>
    <Form value={{secret: ''}} className="container row">
      <Form.Password
        renderer="my-input"
        param="secret"
        pattern={/^[0-9\-+\/?]+$/}
        params={{
          placeholder: "Secret"
        }}
      />
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);

export const RadioSet = () =>  (
  <FormRenderer>
    <Form value={{color: ''}} className="container row">
      <Form.Radio
        renderer="my-radio-set"
        param="color"
        params={[
          {key: 'red', label: 'Red'},
          {key: 'blue', label: 'Blue'},
          {key: 'green', label: 'Green'},
        ]}
      />
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);

export const TextArea = () =>  (
  <FormRenderer>
    <Form value={{description: ''}} className="container row">
      <Form.TextArea
        renderer="my-textarea"
        param="description"
        params={{
          placeholder: "Description",
          label: "Description"
        }}
      />
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);

export const Numeric = () =>  (
  <FormRenderer>
    <Form value={{age: null}} className="container row">
      <Form.Numeric
        renderer="my-input"
        param="age"
        params={{
          placeholder: "Age"
        }}
      />
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);

export const IsoDate = () =>  (
  <FormRenderer>
    <Form value={{created: new Date()}} className="container row">
      <Form.Date
        renderer="my-input"
        param="created"
        required={true}
        formatOutputValue={(date?: Date) => date?.toISOString()}
        params={{
          placeholder: "Created"
        }}
      />
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);

export const DynamicValue = () =>  {
  const ref = useRef<FieldsController<{name: string}>>();

  useEffect(() => {
    setTimeout(() => {
      ref.current?.setFieldValue('name', "New dynamic value");
    }, 2000);
  }, []);

  return (
    <FormRenderer>
      <Form value={{name: ''}} className="container row" fieldsControllerRef={ref}>
        <Form.Text
          renderer="my-input"
          param="name"
          params={{
            placeholder: "Name"
          }}
        />
        <Form.Submit
          renderer="my-submit"
          onSubmit={async (e) => console.log(e)}
          params={"Submit"}
        />
      </Form>
    </FormRenderer>
  )
};

export const FullForm = () =>  (
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
      <Form.TextArea
        renderer="my-textarea"
        param="description"
        params={{
          placeholder: "Description",
          label: "Description"
        }}
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
      <Form.Select param="status" required={true}>
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
      </Form.Select>
      <Form.Text param={"personal.description"} required={true} pattern={/^[0-9\-+\/?]+$/}>
        {({props, errors}) => (
          <FormControl>
            <span className="form-label">Digits or special characters only: -+/?</span>
            <input className="form-control" placeholder="Desc" {...props} />
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.Text>
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
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
};