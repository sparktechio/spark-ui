import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {DropdownOption} from "../dropdown/DropdownOptions";
import {Dropdown} from "../dropdown/Dropdown";

const options: DropdownOption<string>[] = [
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

const onSearch = () => new Promise<DropdownOption<string>[]>(resolve => setTimeout(() => {
  resolve(options)
}, 2000));

export const Basic = () => {
  const [value, setValue] = useState<DropdownOption<string>>(options[0]);
  return (
    <Dropdown selected={value.id} onSearchOptions={onSearch}>
      <Dropdown.Trigger>
        {value.id}
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Search>
          {({onChange, ...props}) => (
            <input onChange={event => onChange(event.target.value)} {...props}/>
          )}
        </Dropdown.Search>
        <Dropdown.Options<string> onSelect={setValue}>
          {({onSelect, options, loading}) => (
            <>
              <Dropdown.Label>
                {loading ? 'Loading...' : 'Found'}
              </Dropdown.Label>
              {
                options.map(option => (
                  <Dropdown.Item key={option.id} onSelect={() => onSelect(option)}>
                    {option.id}
                  </Dropdown.Item>
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