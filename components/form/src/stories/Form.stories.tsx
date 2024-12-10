import React, {InputHTMLAttributes, useEffect, useRef} from "react";
import {FormControl, Theme} from "./Theme";
import {Form} from "../Form";
import {FieldsController, NumericField} from "@sparkui/react-field";
import {ErrorText, BootstrapTheme, PrimaryButton, WarningText} from "@sparkui/react-theme";
import {FormProvider} from "../context/FormProvider";

export const Text = () =>  (
  <BootstrapTheme>
    <Form value={{name: ''}} className="d-flex flex-column justify-content-between gap-2">
      <Form.Text
        param="name"
        params={{
          label: 'Name',
          input: {
            placeholder: "Name"
          }
        }}
      />
      <Form.Submit onSubmit={async (e) => console.log(e)}>
        {({props}) => <PrimaryButton {...props}>Submit</PrimaryButton>}
      </Form.Submit>
    </Form>
  </BootstrapTheme>
);

export const Email = () =>  (
  <BootstrapTheme>
    <Form value={{name: ''}} className="d-flex flex-column justify-content-between gap-2">
      <WarningText>Required field</WarningText>
      <Form.Email
        param="email"
        params={{
          label: 'Email',
          input: {
            placeholder: "Email"
          }
        }}
      />
      <Form.Submit onSubmit={async (e) => console.log(e)}>
        <PrimaryButton>Submit</PrimaryButton>
      </Form.Submit>
    </Form>
  </BootstrapTheme>
);

export const CheckBox = () =>  (
  <BootstrapTheme>
    <Form value={{new: false}} className="d-flex flex-column justify-content-between gap-2">
      <Form.CheckBox
        param="new"
        params={{
          input: {placeholder: "New"},
          label: "New"
        }}
      />
      <Form.Submit
        onSubmit={async (e) => console.log(e)}
        props={{children: 'Submit'}}
      />
    </Form>
  </BootstrapTheme>
);

export const Password = () =>  (
  <Theme>
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
  </Theme>
);

export const RadioSet = () =>  (
  <Theme>
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
  </Theme>
);

export const TextArea = () =>  (
  <Theme>
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
  </Theme>
);

export const Numeric = () =>  (
  <Theme>
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
  </Theme>
);

export const IsoDate = () =>  (
  <Theme>
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
  </Theme>
);

export const DynamicValue = () =>  {
  const ref = useRef<FieldsController<{name: string}>>();

  useEffect(() => {
    setTimeout(() => {
      ref.current?.setFieldValue('name', "New dynamic value");
    }, 2000);
  }, []);

  return (
    <Theme>
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
    </Theme>
  )
};

export const DynamicFieldsValue = () =>  {
  const ref = useRef<FieldsController<{age: number, size: number}>>();

  useEffect(() => {
    setTimeout(() => {
      ref.current?.setValue(
        {
          age: 15,
          size: 12,
        }
      );
    }, 2000);
    setTimeout(() => {
      console.log(ref.current?.isValid(true));
      console.log(ref.current?.getValue());
    }, 4000);
  }, []);

  return (
    <Theme>
      <FormProvider fieldsControllerRef={ref}>
        <NumericField
          renderer="my-input"
          param="age"
          min={44}
          params={{
            placeholder: "Age"
          }}
        />
        <NumericField
          renderer="my-input"
          param="size"
          min={44}
          params={{
            placeholder: "Size"
          }}
        />
      </FormProvider>
    </Theme>
  )
};

const sate = {custom: '', personal: {name: '', description: "123", age: 2021}, created: new Date(), status: 'started', color: 'green'};

export const FullForm = () =>  (
  <Theme>
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
      <Form.Field<string, HTMLInputElement, InputHTMLAttributes<HTMLInputElement>, any> param="custom" required={true}>
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
            {errors.length > 0 && <ErrorText children={`Validation failed ${errors}`} />}
          </FormControl>
        )}
      </Form.Field>
      <Form.Select param="status" required={true}>
        {({props, errors}) => (
          <FormControl>
            <select className="form-control" {...props}>
              <option value="" disabled>Select your option</option>
              <option value="started">Started</option>
              <option value="finished">Finished</option>
            </select>
            {errors.length > 0 && <ErrorText children={`Validation failed ${errors}`} />}
          </FormControl>
        )}
      </Form.Select>
      <Form.Text param={"personal.description"} required={true} pattern={/^[0-9\-+\/?]+$/}>
        {({props, errors}) => (
          <FormControl>
            <span className="form-label">Digits or special characters only: -+/?</span>
            <input className="form-control" placeholder="Desc" {...props} />
            {errors.length > 0 && <ErrorText children={`Validation failed ${errors}`} />}
          </FormControl>
        )}
      </Form.Text>
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </Theme>
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