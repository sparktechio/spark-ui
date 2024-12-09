import React, {ButtonHTMLAttributes, HTMLAttributes, JSX} from "react";
import styled from "styled-components";

export enum Renderers {
  TEXT = "text",
  TEXT_LABEL = "text-label",
  TEXT_TITLE = "text-title",
  TEXT_SUBTITLE = "text-subtitle",
  TEXT_BODY = "text-body",
  TEXT_INFO = "text-info",
  TEXT_WARNING = "text-warning",
  TEXT_ERROR = "text-error",

  BUTTON = "button",
  BUTTON_PRIMARY = "button-primary",
  BUTTON_SECONDARY = "button-secondary",
  BUTTON_WARNING = "button-warning",
  BUTTON_ERROR = "button-error",
  BUTTON_INFO = "button-info",

  FIELD_TEXT = "field-text",
  FIELD_DATE = "field-date",
  FIELD_TEXT_AREA = "field-text-area",
  FIELD_SELECT = "field-select",
  FIELD_RADIO = "field-radio",
  FIELD_CHECKBOX = "field-checkbox",
}

export const defaultRenderers: Record<string, (props: Record<string, any>) => JSX.Element> = {
  [Renderers.TEXT]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<span {...props}>{children}</span>),
  [Renderers.TEXT_LABEL]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<span {...props}>{children}</span>),
  [Renderers.TEXT_TITLE]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<h1 {...props}>{children}</h1>),
  [Renderers.TEXT_SUBTITLE]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<h3 {...props}>{children}</h3>),
  [Renderers.TEXT_BODY]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<p {...props}>{children}</p>),
  [Renderers.TEXT_INFO]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<Info {...props}>{children}</Info>),
  [Renderers.TEXT_WARNING]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<Warning {...props}>{children}</Warning>),
  [Renderers.TEXT_ERROR]: ({children, ...props}: HTMLAttributes<HTMLSpanElement>) => (<Error {...props}>{children}</Error>),

  [Renderers.BUTTON]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (<button {...props}>{children}</button>),
  [Renderers.BUTTON_PRIMARY]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (<button {...props}><Primary>{children}</Primary></button>),
  [Renderers.BUTTON_SECONDARY]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (<button {...props}><Secondary>{children}</Secondary></button>),
  [Renderers.BUTTON_WARNING]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (<button {...props}><Warning>{children}</Warning></button>),
  [Renderers.BUTTON_ERROR]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (<button {...props}><Error>{children}</Error></button>),
  [Renderers.BUTTON_INFO]: ({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => (<button {...props}><Info>{children}</Info></button>),

  [Renderers.FIELD_TEXT]: ({props, params, errors}) => (
    <>
      <div>
        <label>{params.label}</label>
      </div>
      <input {...params.input} {...props} />
      {errors.length > 0 && (
        <div>
          <Error>Validation failed {errors}</Error>
        </div>
      )}
    </>
  ),
  [Renderers.FIELD_DATE]: ({props, params, errors}) => (
    <>
      <div>
        <label>{params.label}</label>
      </div>
      <input {...params.input} {...props} />
      {errors.length > 0 && (
        <div>
          <Error>Validation failed {errors}</Error>
        </div>
      )}
    </>
  ),
  [Renderers.FIELD_TEXT_AREA]: ({props, params, errors}) => (
    <>
      <div>
        <label>{params.label}</label>
      </div>
      <textarea {...params.textarea} {...props}/>
      {errors.length > 0 && (
        <div>
          <Error>Validation failed {errors}</Error>
        </div>
      )}
    </>
  ),
  [Renderers.FIELD_CHECKBOX]: ({props, params, errors}) => (
    <>
      <div>
        <input id={params.key} {...params.input} {...props}/>
        <label htmlFor={params.key}>{params.label}</label>
      </div>
      {errors.length > 0 && (
        <div>
          <Error>Validation failed {errors}</Error>
        </div>
      )}
    </>
  ),
  [Renderers.FIELD_RADIO]: ({value, props, params, errors}) => (
    <>
      {
        params.map((item: any) => (
          <div key={item.key}>
            <input {...props} id={item.key} value={item.key} checked={value === item.key} className="form-check-input" />
            <label htmlFor={item.key}>{item.label}</label>
          </div>
        ))
      }
      {errors.length > 0 && (
        <div>
          <Error>Validation failed {errors}</Error>
        </div>
      )}
    </>
  ),
  [Renderers.FIELD_SELECT]: ({props, params, errors}) => (
    <select {...props}>
      {
        params.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))
      }
      {errors.length > 0 && (
        <div>
          <Error>Validation failed {errors}</Error>
        </div>
      )}
    </select>
  ),
}

const Primary = styled.span`
    color: blue;
`;

const Secondary = styled.span`
    color: green;
`;

const Error = styled.span`
    color: red;
`;

const Warning = styled.span`
    color: orange;
`;

const Info = styled.span`
  color: gray;
`;