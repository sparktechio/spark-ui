# React Form

## Overview

This module provides a set of reusable React components, `Form` and `FormField`, that handle field validation and payload generation for form inputs. Built with a focus on flexibility, these components allow for easy integration into your projects and can be styled according to your needs.

## Components

### `Form`

The `Form` component is the parent container that manages the state of the form, handles validation, and prepares the form payload upon submission.

#### Props

- **value** (object, optional): Initial form state.
- **onFieldChange** (function(field), optional): A callback called on every field update.
- **onChange** (function(state), optional): A callback called on every update.
- **children** (ReactNode, required): The `FormField` components that represent the form fields of the form.

#### Example Usage
```jsx
import React from "react";
import {Form} from "@sparkui/react-form";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

export const FormStory = () =>  {
  const [nameEnabled, setNameEnabled] = React.useState(true);
  const value = {personal: {name: '', description: "123", age: 2021}, created: new Date(), status: ''};

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
    <FormElement value={value}>
      {
        nameEnabled && (
          <Form.TextField param={"personal.name"} required={true}>
            {({props, errors}) => (
              <FormControl>
                <input className="form-control" placeholder="Name" {...props} />
                {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
                <button className="btn btn-secondary" onClick={() => setNameEnabled(false)}>Hide name</button>
              </FormControl>
            )}
          </Form.TextField>
        )
      }
      <Form.TextField param={"personal.description"} required={true} pattern={/^[0-9\-+\/?]+$/}>
        {({props, errors}) => (
          <FormControl>
            <span className="form-label">Digits or special characters only: -+/?</span>
            <input className="form-control" placeholder="Desc" {...props} />
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.TextField>
      <Form.NumericField {...age}>
        {({props, errors}) => (
          <FormControl>
            <input className="form-control" placeholder={age.param} {...props} />
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.NumericField>
      <Form.DateField param="created" required={true}>
        {({props, errors}) => (
          <FormControl>
            <input className="form-control" placeholder="Created Date" {...props}/>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.DateField>
      <Form.SelectField param="status" required={true}>
        {({props, errors}) => (
          <FormControl>
            <select className="form-control" placeholder="Color" {...props}>
              <option value="" disabled>Select your option</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.SelectField>
      <Form.ButtonSubmit onSubmit={async (e) => console.log(e)}>
        {({props}) => (<button className="btn btn-primary" {...props}>Submit</button>)}
      </Form.ButtonSubmit>
    </FormElement>
  );
}

const FormElement = styled(Form)`
    display:flex;
    flex-direction: column;
    gap: 22px;
    width: 300px;
`;

const FormControl = styled.div`
    display:flex;
    flex-direction: column;
    gap: 4px;
`;
```