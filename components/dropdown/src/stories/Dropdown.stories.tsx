import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {Option} from "../dropdown/DropdownOptions";
import {Dropdown} from "../dropdown/Dropdown";
import {BootstrapTheme, PrimaryButton} from "@sparkui/react-theme";
import {TextField} from "@sparkui/react-field";
import styled from "styled-components";

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

export const Basic = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Option<string>>();
  return (
    <BootstrapTheme>
      <Dropdown open={open} onOpenChange={setOpen} selected={value?.id} onSelect={setValue} onSearchOptions={onSearch}>
        <Dropdown.Trigger asChild>
          <div>
            <PrimaryButton text={value ? value.id : 'Select one item'} onClick={() => setOpen(true)}/>
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Search value="black">
            {({params, ...props}) => (
              <TextField {...props} params={{...params, label: "Search", input: { placeholder: "Search" }}} />
            )}
          </Dropdown.Search>
          <Dropdown.Options<string>>
            {({options, loading}) => (
              <>
                <Dropdown.Label>
                  <span className="text-start p-2">{loading ? 'Loading...' : 'Found'}</span>
                </Dropdown.Label>
                {
                  options.map(option => (
                    <Dropdown.Option key={option.id} option={option}>
                      <Pointer className="p-2">{option.id}</Pointer>
                    </Dropdown.Option>
                  ))
                }
              </>
            )}
          </Dropdown.Options>
        </Dropdown.Content>
      </Dropdown>
    </BootstrapTheme>
  );
};

const Pointer = styled.div`
    cursor: pointer;
`;

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {control: 'color'},
  },
};