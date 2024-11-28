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

### `Field<ValueType, HtmlElementType>`

The `Field` component is the child container that manages the state of the form field.

#### Props

- **param** (string, optional): Comma separated json path for the payload.
- **required** (boolean, optional): Required value from the user
- **min** (number, optional): Min value
- **max** (number, optional): Max value
- **minLength** (number, optional): Min length
- **maxLength** (number, optional): Max length
- **custom** (function(value?: T), optional): Custom validator


#### Instances
- TextField
- NumericField
- DateField
- SelectField
- CheckBoxField
- RadioField


#### Example
```jsx
<Form value={value} onFieldChange={console.log}>
  <Form.TextField param={"details.name"} required={true}>
    {({props, errors}) => (
      <div>
        <input className="form-control" placeholder="Name" {...props} />
        {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
      </div>
    )}
  </Form.TextField>
  <Form.ButtonSubmit onSubmit={async (e) => console.log(e)}>
    {({props}) => (<button className="btn btn-primary" {...props}>Submit</button>)}
  </Form.ButtonSubmit>
</Form>
```

#### Text form field
```tsx
<Form.TextField param={"details.name"} required={true}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Name" {...props} />
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.TextField>
```

#### Numeric form field
```tsx
<Form.NumericField param="details.age" min={33} max={56} validate={(value?: number) => value != 2020}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Age" {...props} />
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.NumericField>
```

#### Date form field
```tsx
<Form.DateField param="created" required={true}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Created Date" {...props}/>
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.DateField>
```

#### Select form field
```tsx
<Form.SelectField param="status" required={true}>
  {({props, errors}) => (
    <div>
      <select className="form-control" placeholder="Color" {...props}>
        <option value="" disabled>Select your option</option>
        <option value="started">Started</option>
        <option value="finished">Finished</option>
      </select>
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.SelectField>
```

#### Checkbox form field
```tsx
<Form.CheckBoxField param="new" required={true}>
  {({props, errors}) => (
    <div>
      <div>
        <input id="new" className="form-check-input" placeholder="Created Date" {...props}/>
        <label htmlFor="new">New2</label>
      </div>
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.CheckBoxField>
```

#### Radio form field
```tsx
<Form.RadioField param="color" required={true}>
  {({value, props, errors}) => (
    <div>
      <div>
        <input {...props} id="orange" name="color" value="orange" checked={value === 'orange'} className="form-check-input" placeholder="Created Date"/>
        <label htmlFor="orange">Orange</label>
      </div>
      <div>
        <input {...props} id="blue" name="blue" value="blue" checked={value === 'blue'} className="form-check-input" placeholder="Created Date"/>
        <label htmlFor="blue">Blue</label>
      </div>
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.RadioField>
```

#### Custom form field
```tsx
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
```

#### Full example with bootstrap UI
```tsx
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Form} from "./form";

export const Basic = () =>  {
  const [nameEnabled, setNameEnabled] = React.useState(true);
  const value = {personal: {name: '', description: "123", age: 2021}, created: new Date(), status: 'started', color: 'green'};

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
      <Form.NumericField parm="personal.age">
        {({props, errors}) => (
          <FormControl>
            <input className="form-control" placeholder="Age" {...props} />
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
      <Form.CheckBoxField param="new" required={true}>
        {({props, errors}) => (
          <FormControl>
            <Row>
              <input id="new" className="form-check-input" placeholder="Created Date" {...props}/>
              <label htmlFor="new">New2</label>
            </Row>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.CheckBoxField>
      <Form.RadioField param="color" required={true}>
        {({value, props, errors}) => (
          <FormControl>
            <Row>
              <input {...props} id="red" name="color" value="red" checked={value === 'red'} className="form-check-input" placeholder="Created Date"/>
              <label htmlFor="red">Red</label>
            </Row>
            <Row>
              <input {...props} id="green" name="color" value="green" checked={value === 'green'} className="form-check-input" placeholder="Created Date"/>
              <label htmlFor="green">Green</label>
            </Row>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.RadioField>
      <Form.RadioField param="color" required={true}>
        {({value, props, errors}) => (
          <FormControl>
            <Row>
              <input {...props} id="orange" name="color" value="orange" checked={value === 'orange'} className="form-check-input" placeholder="Created Date"/>
              <label htmlFor="orange">Orange</label>
            </Row>
            <Row>
              <input {...props} id="blue" name="blue" value="blue" checked={value === 'blue'} className="form-check-input" placeholder="Created Date"/>
              <label htmlFor="blue">Blue</label>
            </Row>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        )}
      </Form.RadioField>
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
      <Form.ButtonSubmit onSubmit={async (e) => console.log(e)}>
        {({props}) => (<button className="btn btn-primary" {...props}>Submit</button>)}
      </Form.ButtonSubmit>
    </FormElement>
  );
}

const FormElement = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 300px;
`;

const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 8px;
`;
```