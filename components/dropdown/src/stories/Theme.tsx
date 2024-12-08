import React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {ThemeProvider} from "@sparkui/react-theme";

export const Theme = ({children}: {children: ReactNode}) => (
  <ThemeProvider
    renderers={
      {
        'my-input': ({props, params, errors}) => (
          <FormControl>
            <input className="form-control" {...params} {...props} />
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        ),
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