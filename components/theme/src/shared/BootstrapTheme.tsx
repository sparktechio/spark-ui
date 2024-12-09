import React, {ButtonHTMLAttributes, HTMLAttributes} from "react";
import {Color, Space, ThemeProvider, ThemeProviderProps} from "../context/ThemeProvider";
import {Renderers} from "./Renderers";

export const BootstrapTheme = ({children, renderers}: ThemeProviderProps<Color, Space>) => (
  <ThemeProvider
    renderers={{
      [Renderers.TEXT_LABEL]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (
        <span className="text-muted" {...props}>{children}</span>),
      [Renderers.TEXT_TITLE]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (
        <span className="fs-3" {...props}>{children}</span>),
      [Renderers.TEXT_SUBTITLE]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (
        <span className="fs-4" {...props}>{children}</span>),

      [Renderers.BUTTON_PRIMARY]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button className="btn btn-primary" {...props}>{children}</button>),
      [Renderers.BUTTON_SECONDARY]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button className="btn btn-secondary" {...props}>{children}</button>),
      [Renderers.BUTTON_WARNING]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button className="btn btn-warning" {...props}>{children}</button>),
      [Renderers.BUTTON_ERROR]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button className="btn btn-danger" {...props}>{children}</button>),
      [Renderers.BUTTON_INFO]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button className="btn btn-light" {...props}>{children}</button>),

      [Renderers.FIELD_TEXT]: ({id, touched, props, params, errors}) => (
        <>
          <div className="form-floating">
            <input
              id={id}
              className={`form-control ${errors.length > 0 ? 'is-invalid' : (touched ? 'is-valid' : '')}`}
              {...params.input}
              {...props}
            />
            <label htmlFor={id}>{params.label}</label>
          </div>
          {errors.length > 0 && (
            <div className="invalid-feedback d-block">
              {params.error ? params.error(errors) : `Validation failed ${errors}`}
            </div>
          )}
        </>
      ),
      [Renderers.FIELD_DATE]: ({id, touched, props, params, errors}) => (
        <>
          <div className="form-group">
            <label htmlFor={id}>{params.label}</label>
            <input
              id={id}
              className={`form-control-date ${errors.length > 0 ? 'is-invalid' : (touched ? 'is-valid' : '')}`}
              {...params.input}
              {...props}
            />
          </div>
          {errors.length > 0 && (
            <div className={id}>
              {params.error ? params.error(errors) : `Validation failed ${errors}`}
            </div>
          )}
        </>
      ),
      [Renderers.FIELD_TEXT_AREA]: ({id, touched, props, params, errors}) => (
        <>
          <div className="form-group">
            <label htmlFor={id}>{params.label}</label>
            <textarea
              id={id}
              className={`form-control ${errors.length > 0 ? 'is-invalid' : (touched ? 'is-valid' : '')}`}
              {...params.input}
              {...props}
            />
          </div>
          {errors.length > 0 && (
            <div className="invalid-feedback d-block">
              {params.error ? params.error(errors) : `Validation failed ${errors}`}
            </div>
          )}
        </>
      ),
      [Renderers.FIELD_CHECKBOX]: ({id, props, params, errors}) => (
        <>
          <div className="form-check">
            <input
              id={id}
              className="form-check-input"
              {...params.input}
              {...props}
            />
            <label className="form-check-label" htmlFor={id}>
              {params.label}
            </label>
            {errors.length > 0 && (
              <div className="invalid-feedback d-block">
                {params.error ? params.error(errors) : `Validation failed ${errors}`}
              </div>
            )}
          </div>
        </>
      ),
      [Renderers.FIELD_RADIO]: ({id, props, params, errors}) => (
        <>
          {
            params.map((item: any) => (
              <div className="form-check" key={item.key}>
                <input
                  id={item.key}
                  name={id}
                  className="form-check-input"
                  {...item.input}
                  {...props}
                />
                <label className="form-check-label" htmlFor={item.key}>
                  {item.label}
                </label>
              </div>
            ))
          }
          {errors.length > 0 && (
            <div className="invalid-feedback d-block">
              {params.error ? params.error(errors) : `Validation failed ${errors}`}
            </div>
          )}
        </>
      ),
      [Renderers.FIELD_SELECT]: ({props, params, errors}) => (
        <>
          <select className="form-select" {...props}>
            {
              params.map((item: any) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))
            }
          </select>
          {errors.length > 0 && (
            <div className="invalid-feedback d-block">
              {params.error ? params.error(errors) : `Validation failed ${errors}`}
            </div>
          )}
        </>
      ),
      ...
        (renderers ?? {}),
    }}
  >
    {
      children
    }
  </ThemeProvider>
)