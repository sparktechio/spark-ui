import React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {ErrorText, ThemeProvider} from "@sparkui/react-theme";
import {MyDropdown} from "./MyDropdown";

export const FormRenderer = ({children}: {children: ReactNode}) => (
  <ThemeProvider
    renderers={
      {
        'my-submit': ({props, params}) => (
          <FormControl>
            <button className="btn btn-primary p-2" {...props}>{params}</button>
          </FormControl>
        ),
        'my-input': ({props, params, errors}) => (
          <FormControl>
            <input className="form-control" {...params} {...props} />
            {errors.length > 0 && <ErrorText text={`Validation failed ${errors}`} />}
          </FormControl>
        ),
        'my-dropdown': ({value, onChange, params, errors}) => (
          <FormControl>
            <MyDropdown {...{value, onChange}} {...params} />
            {errors.length > 0 && <ErrorText text={`Validation failed ${errors}`} />}
          </FormControl>
        )
      }
    }
  >
    {children}
  </ThemeProvider>
);

export const FormControl = styled.div.attrs({className: "col-12 p-2"})`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 8px;
`;