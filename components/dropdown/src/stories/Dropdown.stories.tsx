import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {Option} from "../dropdown/DropdownOptions";
import {Dropdown} from "../dropdown/Dropdown";
import {FormControl, Theme} from "./Theme";
import {TextField} from "@sparkui/react-field";

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
    <Theme>
      <Dropdown selected={value.id} onSelect={setValue} onSearchOptions={onSearch}>
        <Dropdown.Trigger>
          {value.id}
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Search value="black" renderer="my-input" />
          <Dropdown.Options<string>>
            {({options, loading}) => (
              <>
                <Dropdown.Label>
                  <span className="text-start p-2">{loading ? 'Loading...' : 'Found'}</span>
                </Dropdown.Label>
                {
                  options.map(option => (
                    <Dropdown.Option key={option.id} option={option}>
                      <span className="text-start p-2">{option.id}</span>
                    </Dropdown.Option>
                  ))
                }
              </>
            )}
          </Dropdown.Options>
          <Dropdown.Search value="black">
            {
              ({props, params, errors}) => (
                <FormControl>
                  <input className="form-control" {...params} {...props} />
                  {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
                </FormControl>
              )
            }
          </Dropdown.Search>
        </Dropdown.Content>
      </Dropdown>
    </Theme>
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