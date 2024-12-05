import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {Option} from "../dropdown/DropdownOptions";
import {Dropdown} from "../dropdown/Dropdown";

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
  const [value, setValue] = useState<Option<string>>(options[0]);
  return (
    <Dropdown selected={value.id} onSelect={setValue} onSearchOptions={onSearch}>
      <Dropdown.Trigger>
        {value.id}
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Search>
          {({onChange, ...props}) => (
            <input onChange={event => onChange(event.target.value)} {...props}/>
          )}
        </Dropdown.Search>
        <Dropdown.Options<string>>
          {({options, loading}) => (
            <>
              <Dropdown.Label>
                {loading ? 'Loading...' : 'Found'}
              </Dropdown.Label>
              {
                options.map(option => (
                  <Dropdown.Option key={option.id} option={option}>
                    {option.id}
                  </Dropdown.Option>
                ))
              }
            </>
          )}
        </Dropdown.Options>
      </Dropdown.Content>
    </Dropdown>
  );
}

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