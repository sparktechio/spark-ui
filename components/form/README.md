# React Form
- Simple design and ease of use
- Style-agnostic
- Validation:
  - Basic and complex validators
  - Automatic focus and scroll to the first invalid field
- Conditional rendering
- Automatic payload generation
- Dynamic patching
- Disabled double submit
- Globally defined elements
- Applicable to any React framework
- 
```jsx
<Form value={{request: {email: 'initial@google.com'}}} onFieldChange={console.log}>
  <Form.EmailField param="request.email" required={true} pattern="/^[a-zA-Z0-9._%+-]+@domain\.com$/">
    {({props, errors}) => (
      <>
        <label>Only company domain @domain.com</label>
        <input placeholder="Email" {...props} />
        {errors.length > 0 && <span>Validation failed {errors}</span>}
      </>
    )}
  </Form.EmailField>
  <Form.PasswordField param="request.password" required={true}>
    {({props, errors}) => (
      <>
        <input placeholder="Password" {...props} />
        {errors.length > 0 && <span>Validation failed {errors}</span>}
      </>
    )}
  </Form.PasswordField>
  <Form.ButtonSubmit onSubmit={async (e) => console.log(e)}>
    {({props}) => (<button {...props}>Submit</button>)}
  </Form.ButtonSubmit>
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

### `Field<ValueType, ElementType>`

The `Field` component is the child container that manages the state of the form field.

#### Props

- **param** (string, optional): Comma separated json path for the payload.
- **required** (boolean, optional): Required value from the user
- **min** (number, optional): Min value
- **max** (number, optional): Max value
- **minLength** (number, optional): Min length
- **maxLength** (number, optional): Max length
- **custom** (function(value?: T) => boolean, optional): Custom validator
- **children** (function(props: FieldChildrenProps<ValueType, ElementType>) => JSX.Element, required): Field renderer
  - **onChange** (function(value?: T) => void, required): Set new value
  - **onBlur** (function(value?: T) => void), required: Mark as touched and set new value
  - **ref** (RefObject, required): Reference that should be forwarded to focusable element
  - **value** (V, optional): Current value
  - **fields** (Field<V>[], optional): All fields
  - **getField** (function(value: string) => Field<V>, required): Find field object by param
  - **getValue** (function(value: string) => V, required): Find value of some another field by param
  - **props** (any, optional): Props prepared for native elements
  - **params** (any, optional): Custom params

```tsx
<Form.Field<string, HTMLInputElement> param="custom" required={true}>
  {({
      onChange, // Register change
      onBlur, // Register blor
      ref,  // Reference intended for the focus in case of errors
      value,  // Current value
      errors, // List of errors triggered with onBlur or onChange when touched
      fields, // List of all fields in the form
      getValue, // Get value of any field by param
      fetField, // Get field object of any field by param
  }) => (
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

#### Instances
- TextField
- EmailField
- PasswordField
- NumericField
- DateField
- SelectField
- CheckBoxField
- RadioField
- FilesField
- Text (render template defined inside `FormRenderProvider`)
- Email (render template defined inside `FormRenderProvider`)
- Password (render template defined inside `FormRenderProvider`)
- Numeric (render template defined inside `FormRenderProvider`)
- Date (render template defined inside `FormRenderProvider`)
- Select (render template defined inside `FormRenderProvider`)
- CheckBox (render template defined inside `FormRenderProvider`)
- Radio (render template defined inside `FormRenderProvider`)
- Files (render template defined inside `FormRenderProvider`)

### `FormRenderProvider`

The `FormRenderProvider` component is the contextual definition of reusable renders and all forms inside current provider
can share renderers reference by name.

#### Example
```tsx
export const FormRenderer = ({children}: {children: ReactNode}) => (
  <FormRenderProvider
    submitRenderers={
      {
        'my-submit': ({props, params}) => (<button className="btn btn-primary" {...props}>{params}</button>)
      }
    }
    fieldRenderers={
      {
        'my-input': ({props, params, errors}) => (
          <>
            <input className="form-control" {...params} {...props} />
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </>
        ),
        'my-checkbox': ({props, params, errors}) => (
          <>
            <>
              <input id="new" className="form-check-input" {...params.input} {...props}/>
              <label htmlFor="new">{...params.label}</label>
            </>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </>
        ),
        'my-radio-set': ({value, props, params, errors}) => (
          <>
            {
              params.map((item: any) => (
                <div key={item.key}>
                  <input {...props} id={item.key} value={item.key} checked={value === item.key} className="form-check-input" />
                  <label htmlFor={item.key}>{item.label}</label>
                </div>
              ))
            }
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </>
        ),
      }
    }
  >
    {children}
  </FormRenderProvider>
);
```


#### Form example
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
<Form.TextField param={"details.secret"} required={true}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Secret" {...props} />
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.TextField>

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
<Form.NumericField param="details.age" min={33} max={56} validate={(value?: number) => value != 2020}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Age" {...props} />
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.NumericField>

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
<Form.DateField param="created" required={true}>
  {({props, errors}) => (
    <div>
      <input className="form-control" placeholder="Created Date" {...props}/>
      {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
    </div>
  )}
</Form.DateField>

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