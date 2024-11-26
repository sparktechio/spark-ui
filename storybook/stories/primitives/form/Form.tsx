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
    placeholder: "age",
    param: "personal.age",
  }

  return (
    <App>
      <Form value={value}>
        {
          nameEnabled && (
            <Form.TextField {...name}>
              {({onChange, onBlur, error, element}) => (
                <FormControl>
                  <input
                    className="form-control"
                    placeholder={name.name}
                    onChange={({target: {value}}) => onChange(value)}
                    onBlur={({target: {value}}) => onBlur(value)}
                    {...element}
                  />
                  {error && <span className="alert alert-danger">Validation failed</span>}
                  <button className="btn btn-secondary" onClick={() => setNameEnabled(false)}>Hide name</button>
                </FormControl>
              )}
            </Form.TextField>
          )
        }
        <Form.TextField {...description}>
          {({onChange, onBlur, error, element}) => (
            <FormControl>
              <span className="form-label">Digits and special characters only: -+/?</span>
              <input
                className="form-control"
                placeholder={description.name}
                onChange={({target: {value}}) => onChange(value)}
                onBlur={({target: {value}}) => onBlur(value)}
                {...element}
              />
              {error && <span className="alert alert-danger">Validation failed</span>}
            </FormControl>
          )}
        </Form.TextField>
        <Form.NumericField {...age}>
          {({onChange, onBlur, error, element}) => (
            <FormControl>
              <input
                className="form-control"
                placeholder={age.name}
                onChange={({target: {valueAsNumber}}) => onChange(valueAsNumber)}
                onBlur={({target: {valueAsNumber}}) => onBlur(valueAsNumber)}
                type="number"
                {...element}
              />
              {error && <span className="alert alert-danger">Validation failed</span>}
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
