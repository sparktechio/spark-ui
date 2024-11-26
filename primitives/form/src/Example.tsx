import React from "react";
import {Field} from "./fields/FormField";
import {Form} from "./Form";

export const Example = () =>  {
  const value = {personal: {name: "akif", age: 22}};
  const name: Field<string> = {
    value: "akif",
    name: "name",
    required: true,
    placeholder: "Name",
    param: "personal.name",
  }
  const description: Field<string> = {
    name: "description",
    required: true,
    placeholder: "description",
    param: "personal.description",
  }
  const age: Field<number> = {
    name: "age",
    required: false,
    placeholder: "age",
    param: "personal.age",
  }
  return (
    <div className="App">
      <Form value={value}>
        <Form.TextField {...name}>
          {({onChange, onBlur, error, element}) => (
            <input
              onChange={({target: {value}}) => onChange(value)}
              onBlur={({target: {value}}) => onBlur(value)}
              style={{ background: error ? "red": "gray" }}
              {...element}
            />
          )}
        </Form.TextField>
        <Form.TextField {...description}>
          {({onChange, onBlur, error, element}) => (
            <input
              onChange={({target: {value}}) => onChange(value)}
              onBlur={({target: {value}}) => onBlur(value)}
              style={{ background: error ? "red": "gray" }}
              {...element}
            />
          )}
        </Form.TextField>
        <Form.NumericField {...age}>
          {({onChange, onBlur, error, element}) => (
            <input
              onChange={({target: {valueAsNumber}}) => onChange(valueAsNumber)}
              onBlur={({target: {valueAsNumber}}) => onBlur(valueAsNumber)}
              style={{ background: error ? "red": "gray" }}
              type="number"
              {...element}
            />
          )}
        </Form.NumericField>
        <Form.ButtonSubmit onSubmit={async (e) => console.log(e)}>
          {(props) => (<button style={{color: 'red'}} {...props}>Send</button>)}
        </Form.ButtonSubmit>
      </Form>
    </div>
  );
}