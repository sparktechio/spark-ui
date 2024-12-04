import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Select} from "../select/Select";
import {SelectOption} from "../select/SelectOptions";

const options: SelectOption<string>[] = [
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

const onSearch = () => new Promise<SelectOption<string>[]>(resolve => setTimeout(() => {
  resolve(options)
}, 2000));

export const Basic = () => (
  <Select selected='one' options={options} onSearchOptions={onSearch}>
    <Select.Search>
      {({onChange, ...props}) => (
        <input onChange={event => onChange(event.target.value)} {...props} />
      )}
    </Select.Search>
    <Select.Options<string> onSelect={console.log}>
      {({onSelect, options, loading}) => (<>
        {
          loading ? 'Loading...' : (
            <select>
              {
                options.map(option => (
                  <option key={option.id} value={option.value} onSelect={() => onSelect(option)}>
                    {option.id}
                  </option>
                ))
              }
            </select>
          )
        }
      </>)}
    </Select.Options>
  </Select>
)

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {control: 'color'},
  },
};