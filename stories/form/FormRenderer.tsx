import React from "react";
import {FormRenderProvider} from "./form/context/FormRenderProvider";
import {ReactNode} from "react";
import styled from "styled-components";

export const FormRenderer = ({children}: {children: ReactNode}) => (
  <FormRenderProvider
    submitRenderers={
      {
        'my-submit': ({props, params}) => (<button className="btn btn-primary" {...props}>{params}</button>)
      }
    }
    fieldRenderers={
      {
        'my-input': ({props, params, errors}) => (
          <FormControl>
            <input className="form-control" {...params} {...props} />
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
  </FormRenderProvider>
);

export const FormControl = styled.div.attrs({className: "col-12 col-md-6 p-2"})`
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