import React, {useState} from "react";
import {Option} from "@sparkui/react-dropdown/dist/dropdown/DropdownOptions";
import {Dropdown} from "@sparkui/react-dropdown";
import {PrimaryButton} from "@sparkui/react-theme";
import {TextField} from "@sparkui/react-field";
import styled from "styled-components";

export interface MyDropdownProps {
  value: string;
  options: Option<string>[];
  onChange: (value: string) => void;
  onSearch: (query: string) => Promise<Option<string>[]> | Option<string>[];
}

export const MyDropdown = ({onChange, options, onSearch}: MyDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Option<string>>();

  return (
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
  );
}

const Pointer = styled.div`
    cursor: pointer;
`;