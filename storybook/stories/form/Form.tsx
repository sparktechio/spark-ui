import React from "react";
import {Form} from "@sparkui/react-form";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

export const FormStory = () =>  {
  const [nameEnabled, setNameEnabled] = React.useState(true);
  const value = {personal: {name: '', description: "akif", age: 22}};

  const name = {
    name: "name",
    required: true,
    placeholder: "Name",
    param: "personal.name",
  }

  const description = {
    name: "description",
    required: true,
    pattern: /^[0-9\-+\/?]+$/,
    placeholder: "description",
    param: "personal.description",
  }

  const age = {
    name: "age",
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
    <App>
      <Form value={value}>
        {
          nameEnabled && (
            <Form.TextField {...name}>
              {({onChange, onBlur, errors, element}) => (
                <FormControl>
                  <input
                    className="form-control"
                    placeholder={name.name}
                    onChange={({target: {value}}) => onChange(value)}
                    onBlur={({target: {value}}) => onBlur(value)}
                    {...element}
                  />
                  {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
                  <button className="btn btn-secondary" onClick={() => setNameEnabled(false)}>Hide name</button>
                </FormControl>
              )}
            </Form.TextField>
          )
        }
        <Form.TextField {...description}>
          {({onChange, onBlur, errors, element}) => (
            <FormControl>
              <span className="form-label">Digits and special characters only: -+/?</span>
              <input
                className="form-control"
                placeholder={description.name}
                onChange={({target: {value}}) => onChange(value)}
                onBlur={({target: {value}}) => onBlur(value)}
                {...element}
              />
              {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
            </FormControl>
          )}
        </Form.TextField>
        <Form.NumericField {...age}>
          {({onChange, onBlur, errors, element}) => (
            <FormControl>
              <input
                className="form-control"
                placeholder={age.name}
                onChange={({target: {valueAsNumber}}) => onChange(valueAsNumber)}
                onBlur={({target: {valueAsNumber}}) => onBlur(valueAsNumber)}
                type="number"
                {...element}
              />
              {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
            </FormControl>
          )}
        </Form.NumericField>
        <Form.ButtonSubmit onSubmit={async (e) => console.log(e)}>
          {(props) => (<button className="btn btn-primary"  {...props}>Submit</button>)}
        </Form.ButtonSubmit>
      </Form>
    </App>
  );
}

const App = styled.div`
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
