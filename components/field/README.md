# React Field
Automated the functional part of the React input fields:
- Simple design and ease of use
- Style-agnostic
- Validation:
    - Basic and complex validators
    - Automatic focus and scroll to the first invalid field
- Conditional rendering
- Control fields outside
- Dynamic patching
- Globally defined elements
- Applicable to any React framework

### `Field<ValueType, ElementType, NativeElementType, CustomPropsType>`

The `Field` component is the child container that manages the state of the form field.

#### Props

- **param** (string, optional): Comma separated json path for the payload.
- **required** (boolean, optional): Required value from the user
- **min** (number, optional): Min value
- **max** (number, optional): Max value
- **minLength** (number, optional): Min length
- **maxLength** (number, optional): Max length
- **custom** (function(value?: T) => boolean, optional): Custom validator
- **children** (function(props: FieldChildrenProps<ValueType, ElementType>) => ReactNode, required): Field renderer
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

### Text Field
```tsx
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
```

### CheckBox Field
```tsx
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
```

### Password Field
```tsx
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
```

### Radio Field
```tsx
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
```

### Text Area Field
```tsx
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
```

### Numeric Field
```tsx
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
```

### Date Field
```tsx
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
```

### Dynamic Field
```tsx
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
```