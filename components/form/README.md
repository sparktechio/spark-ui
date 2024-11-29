# React Form

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
- PasswordField
- NumericField
- DateField
- SelectField
- CheckBoxField
- RadioField
- AppTextField (render template defined inside `FormRenderProvider`)
- AppPasswordField (render template defined inside `FormRenderProvider`)
- AppNumericField (render template defined inside `FormRenderProvider`)
- AppDateField (render template defined inside `FormRenderProvider`)
- AppSelectField (render template defined inside `FormRenderProvider`)
- AppCheckBoxField (render template defined inside `FormRenderProvider`)
- AppRadioField (render template defined inside `FormRenderProvider`)

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
          <FormControl>
            <input className="form-control" {...params} {...props} />
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        ),
        'my-checkbox': ({props, params, errors}) => (
          <FormControl>
            <Row>
              <input id="new" className="form-check-input" {...params.input} {...props}/>
              <label htmlFor="new">{...params.label}</label>
            </Row>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        ),
        'my-radio-set': ({value, props, params, errors}) => (
          <FormControl>
            {
              params.map((item: any) => (
                <Row key={item.key}>
                  <input {...props} id={item.key} value={item.key} checked={value === item.key} className="form-check-input" />
                  <label htmlFor={item.key}>{item.label}</label>
                </Row>
              ))
            }
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        ),
      }
    }
  >
    {children}
  </FormRenderProvider>
);

export const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 8px;
`;
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

<Form.AppTextField
  renderer="my-input"
  param={"details.name"}
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

<Form.AppPasswordField
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

<Form.AppNumericField
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

<Form.AppDateField
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
export const ExampleForm = () =>  {
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
};

const FormElement = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 300px;
`;
```