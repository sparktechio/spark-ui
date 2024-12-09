import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Dialog} from "@sparkui/react-dialog";
import styled from "styled-components";
import {Form} from "@sparkui/react-form";
import {Option} from "@sparkui/react-dropdown";
import {BootstrapTheme, ErrorText} from "@sparkui/react-theme";
import {MyDropdown} from "./MyDropdown";

const options: Option<string>[] = [
  {
    id: 'one',
    value: 'one',
  },
  {
    id: 'two',
    value: 'two',
  },
  {
    id: 'three',
    value: 'three',
  }
];

const onSearch = (query: string) => new Promise<Option<string>[]>(resolve => setTimeout(() => {
  resolve([...options, {
    id: query,
    value: query,
  }])
}, 1000));

export const Basic = () => (
  <BootstrapTheme
    renderers={{
      'my-dropdown': ({value, onChange, params, errors}) => (
        <FormControl>
          <MyDropdown {...{value, onChange}} {...params} />
          {errors.length > 0 && <ErrorText text={`Validation failed ${errors}`} />}
        </FormControl>
      )
    }}
  >
    <Dialog>
      <Dialog.Trigger asChild>
        <button>Open</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Wrapper>
          <Dialog.Title>
            Title
          </Dialog.Title>
          <Form value={{name: '', size: 'one'}} className="container row">
            <Form.Text
              param="name"
              params={{
                label: "Name",
                input: {placeholder: "Name"}
              }}
            />
            <Form.Field
              renderer="my-dropdown"
              param="size"
              params={{
                options,
                onSearch
              }}
            />
            <Form.Submit
              onSubmit={async (e) => console.log(e)}
              params="Submit"
            />
          </Form>
          <Dialog.Close>
            Close
          </Dialog.Close>
        </Wrapper>
      </Dialog.Content>
    </Dialog>
  </BootstrapTheme>
);

const Wrapper = styled.div`
    padding: 16px;
`;

export const FormControl = styled.div.attrs({className: "col-12 p-2"})`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export default {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};