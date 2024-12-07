# React Theme

## `ThemeProvider`

The `ThemeProvider` component is the contextual definition of reusable renders and all forms inside current provider
can share renderers reference by name.

### Example
```tsx
export const FormRenderer = ({children}: {children: ReactNode}) => (
  <ThemeProvider
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
  </ThemeProvider>
);
```

## Title text
```tsx
export const TitleText = () => (
  <ThemeProvider>
    <TitleText text="Title Text"/>
  </ThemeProvider>
);
```

## Subtitle text
```tsx
export const SubtitleText = () => (
  <ThemeProvider>
    <SubtitleText text="Subtitle Text"/>
  </ThemeProvider>
);
```

## Label text
```tsx
export const LabelText = () => (
  <ThemeProvider>
    <LabelText text="Label Text"/>
  </ThemeProvider>
);
```

## Body text
```tsx
export const BodyText = () => (
  <ThemeProvider>
    <Text text="Body Text"/>
  </ThemeProvider>
);
```

## Error text
```tsx
export const ErrorText = () => (
  <ThemeProvider>
    <ErrorText text="Error Text"/>
  </ThemeProvider>
);
```

## Warning text
```tsx
export const WarningText = () => (
  <ThemeProvider>
    <WarningText text="Warning Text"/>
  </ThemeProvider>
);
```

## Info text
```tsx
export const InfoText = () => (
  <ThemeProvider>
    <InfoText text="Info Text"/>
  </ThemeProvider>
);
```

## Primary button
```tsx
export const ButtonPrimary = () => (
  <ThemeProvider>
    <PrimaryButton onClick={console.log} text="Primary Text"/>
  </ThemeProvider>
);
```

## Secondary button
```tsx
export const ButtonSecondary = () => (
  <ThemeProvider>
    <SecondaryButton onClick={console.log} text="Secondary Text"/>
  </ThemeProvider>
);
```

## Info button
```tsx
export const ButtonInfo = () => (
  <ThemeProvider>
    <InfoButton onClick={console.log} text="Info Text"/>
  </ThemeProvider>
);
```

## Error button
```tsx
export const ButtonError = () => (
  <ThemeProvider>
    <ErrorButton onClick={console.log} text="Error Text"/>
  </ThemeProvider>
);
```

## Warning button
```tsx
export const ButtonWarning = () => (
  <ThemeProvider>
    <WarningButton onClick={console.log} text="Warning Text"/>
  </ThemeProvider>
);
```

## Custom field
```tsx
const Button = () => {
  return <Renderer
    name='my-submit'
    props={
      {
        props: {className: "btn btn-primary p-2", onClick: console.log},
        params: {title: 'Submit'}
      }
    }
  />
}

export const Custom = () => (
  <ThemeProvider
    renderers={
      {
        'my-submit': ({props, params}) => (
          <button {...props}>{params.title}</button>
        )
      }
    }
  >
    <Button />
  </ThemeProvider>
);
```