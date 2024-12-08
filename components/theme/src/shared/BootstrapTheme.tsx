import React from "react";
import {Color, Space, ThemeProvider, ThemeProviderProps} from "../context/ThemeProvider";
import {Renderers} from "./Renderers";

export const BootstrapTheme = ({children, renderers}: ThemeProviderProps<Color, Space>) => (
    <ThemeProvider
      renderers={{
        [Renderers.TEXT_LABEL]: ({text, ...props}: Record<string, any>) => (<span className="text-muted" {...props}>{text}</span>),
        [Renderers.TEXT_TITLE]: ({text, ...props}: Record<string, any>) => (<span className="fs-3" {...props}>{text}</span>),
        [Renderers.TEXT_SUBTITLE]: ({text, ...props}: Record<string, any>) => (<span className="fs-4" {...props}>{text}</span>),

        [Renderers.BUTTON_PRIMARY]: ({text, ...props}: Record<string, any>) => (
          <button className="btn btn-primary" {...props}>{text}</button>),
        [Renderers.BUTTON_SECONDARY]: ({text, ...props}: Record<string, any>) => (
          <button className="btn btn-secondary" {...props}>{text}</button>),
        [Renderers.BUTTON_WARNING]: ({text, ...props}: Record<string, any>) => (
          <button className="btn btn-warning" {...props}>{text}</button>),
        [Renderers.BUTTON_ERROR]: ({text, ...props}: Record<string, any>) => (
          <button className="btn btn-danger" {...props}>{text}</button>),
        [Renderers.BUTTON_INFO]: ({text, ...props}: Record<string, any>) => (
          <button className="btn btn-light" {...props}>{text}</button>),

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