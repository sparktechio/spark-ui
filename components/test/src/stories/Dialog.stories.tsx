import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Dialog} from "@sparkui/react-dialog";
import styled from "styled-components";
import {Form} from "@sparkui/react-form";
import {FormRenderer} from "./FormRenderer";
import {Option} from "@sparkui/react-dropdown/dist/dropdown/DropdownOptions";

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
  <Dialog>
    <Dialog.Trigger asChild>
      <button>Open</button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Wrapper>
        <Dialog.Title>
          Title
        </Dialog.Title>
        <FormRenderer>
          <Form value={{name: '', size: 'one'}} className="container row">
            <Form.Text
              renderer="my-input"
              param="name"
              params={{
                placeholder: "Name"
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
              renderer="my-submit"
              onSubmit={async (e) => console.log(e)}
              params={"Submit"}
            />
          </Form>
        </FormRenderer>
        <Dialog.Close>
          Close
        </Dialog.Close>
      </Wrapper>
    </Dialog.Content>
  </Dialog>
);

const Wrapper = styled.div`
    padding: 16px;
`

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