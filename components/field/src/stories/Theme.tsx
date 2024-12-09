import React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {Renderers, ThemeProvider} from "@sparkui/react-theme";

export const Theme = ({children}: {children: ReactNode}) => (
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
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        ),
        'my-textarea': ({props, params, errors}) => (
          <FormControl>
            <label>{...params.label}</label>
            <textarea className="form-control" {...params.input} {...props}/>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        ),
        'my-checkbox': ({props, params, errors}) => (
          <FormControl>
            <Row>
              <input id="new" className="form-check-input" {...params.input} {...props}/>
              <label htmlFor="new">{...params.label}</label>
            </Row>
            {errors.length > 0 && <span className="alert alert-danger my-2">Validation failed {errors}</span>}
          </FormControl>
        ),
        'my-radio-set': ({value, props, params, errors}) => (
          <FormControl>
            {
              params.map((item: any) => (
                <Row key={item.key}>
                  <input {...props} id={item.key} value={item.key} checked={value === item.key} className="form-check-input" />
                  <label htmlFor={item.key}>{item.label}</label>
                </Row>
              ))
            }
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

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 8px;
`;