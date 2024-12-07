# React Form
Automated the functional part of the React forms:
- Simple design and ease of use
- Style-agnostic
- Validation:
  - Basic and complex validators
  - Automatic focus and scroll to the first invalid field
- Conditional rendering
- Control fields outside
- Automatic payload generation
- Dynamic patching
- Disabled double submit
- Globally defined elements
- Applicable to any React framework

```jsx
<Form value={{request: {email: 'user@domain.com'}}} onFieldChange={console.log}>
  <Form.Email param="request.email" required={true} pattern="/^[a-zA-Z0-9._%+-]+@domain\.com$/">
    {({props, errors}) => (
      <>
        <label>Only company domain @domain.com:</label>
        <input placeholder="Email" {...props} />
        {errors.length > 0 && <span>Validation failed {errors}</span>}
      </>
    )}
  </Form.Email>
  <Form.Password param="request.password" required={true}>
    {({props, errors}) => (
      <>
        <label>Password:</label>
        <input placeholder="Password" {...props} />
        {errors.length > 0 && <span>Validation failed {errors}</span>}
      </>
    )}
  </Form.Password>
  <Form.Submit onSubmit={async (e) => console.log(e)}>
    {({props}) => (<button {...props}>Submit</button>)}
  </Form.Submit>
</Form>
```

## Overview
You are building React user interfaces and want to gather input from users, but you also want to validate that input, 
including some basic checks and complex custom checks and want to set default values as object for whole form.
Additionally, you aim to generate a request payload and display certain fields conditionally. On top of that you
want to control rendering, component hooks, visualization of the errors and side effects. Furthermore, you would 
like to incorporate custom user-defined form fields and buttons, or even utilize third-party components, 
while maintaining control over the styling and overall look and feel of the form. 

For all these requirements, React Form `@sparkui/react-form` is exactly what you need.

This module provides a set of reusable React components, `Form`, `FormField`, `TextField` ..., that handle
field validation and payload generation for form inputs. Built with a focus on flexibility, these components 
allow for easy integration into your projects and can be styled according to your needs.

## Components

### `Form`

The `Form` component is the parent container that manages the state of the form, handles validation, and prepares the form payload upon submission.

#### Props

- **value** (object, optional): Initial form state.
- **onFieldChange** (function(field), optional): A callback called on every field update.
- **onStateChange** (function(state), optional): A callback called on every update.
- **children** (ReactNode, required): The `FormField` components that represent the form fields of the form.

#### Form example
```jsx
<Form value={value} onFieldChange={console.log}>
  <Form.Text param={"details.name"} required={true}>
    {({props, errors}) => (
      <div>
        <input className="form-control" placeholder="Name" {...props} />
        {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
      </div>
    )}
  </Form.Text>
  <Form.Submit onSubmit={async (e) => console.log(e)}>
    {({props}) => (<button className="btn btn-primary" {...props}>Submit</button>)}
  </Form.Submit>
</Form>
```

#### Text form field
```tsx
<Form.Text param={"details.name"} required={true}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Name" {...props} />
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.Text>

// or with global renderer

<Form.Text
  renderer="my-input"
  param="details.name"
  required={true}
  params={{
    placeholder: "Name"
  }}
/>
```

#### Password form field
```tsx
<Form.Text param={"details.secret"} required={true}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Secret" {...props} />
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.Text>

// or with global renderer

<Form.Password
  renderer="my-input"
  param={"details.secret"}
  required={true}
  params={{
    placeholder: "Secret"
  }}
/>
```

#### Numeric form field
```tsx
<Form.Numeric param="details.age" min={33} max={56} validate={(value?: number) => value != 2020}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Age" {...props} />
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.Numeric>

// or with global renderer

<Form.Numeric
  renderer="my-input"
  param="details.age"
  params={{
    placeholder: "Age"
  }}
/>
```

#### Date form field
```tsx
<Form.Date param="created" required={true}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Created Date" {...props}/>
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.Date>

// or with global renderer

<Form.Date
  renderer="my-input"
  param="created"
  required={true}
  params={{
    placeholder: "Age"
  }}
/>
```

#### Select form field
```tsx
<Form.Select param="status" required={true}>
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
</Form.Select>
```

#### Checkbox form field
```tsx
<Form.CheckBox param="new" required={true}>
  {({props, errors}) => (
    <div>
      <div>
        <input id="new" className="form-check-input" placeholder="Created Date" {...props}/>
        <label htmlFor="new">New2</label>
      </div>
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.CheckBox>
```

#### Radio form field
```tsx
<Form.Radio param="color" required={true}>
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
</Form.Radio>
```

#### Custom form field
```tsx
<Form.Field<string, HTMLInputElement> param="custom" required={true}>
  {({onChange, onBlur, ref, value, errors}) => (
      <>
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
      </>
    )}
</Form.Field>
```

#### Full example with bootstrap UI
```tsx
const initialState = {personal: {name: '', description: "123", age: 2021}, created: new Date(), status: 'started', color: 'green'};

export const ExampleForm = () => (
  <FormRenderer>
    <Form value={initialState}>
      <Form.Text
        renderer="my-input"
        param={"personal.name"}
        required={true}
        params={{
          placeholder: "Name"
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
      <Form.Submit
        renderer="my-submit"
        onSubmit={async (e) => console.log(e)}
        params={"Submit"}
      />
    </Form>
  </FormRenderer>
);
```