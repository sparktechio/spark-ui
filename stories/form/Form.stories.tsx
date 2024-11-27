import { fn } from '@storybook/test';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Form} from "./form";

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

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
};

export const Basic = () =>  {
  const [nameEnabled, setNameEnabled] = React.useState(true);
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
