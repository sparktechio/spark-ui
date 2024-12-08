import React, {useState} from "react";
import {Option} from "@sparkui/react-dropdown/dist/dropdown/DropdownOptions";
import {Dropdown} from "@sparkui/react-dropdown";

export interface MyDropdownProps {
  value: string;
  options: Option<string>[];
  onChange: (value: string) => void;
  onSearch: (query: string) => Promise<Option<string>[]> | Option<string>[];
}

export const MyDropdown = ({onChange, value, options, onSearch}: MyDropdownProps) => {
  const [selected, setSelected] = useState<Option<string>>(options[0]);

  const change = (value: Option<string>) => {
    console.log(value, onChange);
    setSelected(value);
    onChange(value.id);
  }

  return (
    <Dropdown selected={selected.id} onSelect={change} onSearchOptions={onSearch}>
      <Dropdown.Trigger>
        {selected.id}
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