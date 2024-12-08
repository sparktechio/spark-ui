import React, {JSX} from "react";
import styled from "styled-components";

export enum Renderers {
  TEXT_LABEL = "text-label",
  TEXT_TITLE = "text-title",
  TEXT_SUBTITLE = "text-subtitle",
  TEXT_BODY = "text-body",
  TEXT_INFO = "text-info",
  TEXT_WARNING = "text-warning",
  TEXT_ERROR = "text-error",

  BUTTON_PRIMARY = "button-primary",
  BUTTON_SECONDARY = "button-secondary",
  BUTTON_WARNING = "button-warning",
  BUTTON_ERROR = "button-error",
  BUTTON_INFO = "button-info",

  FIELD_INPUT = "field-input",
  FIELD_TEXT_AREA = "field-text-area",
  FIELD_SELECT = "field-select",
  FIELD_RADIO = "field-radio",
  FIELD_CHECKBOX = "field-checkbox",
}

export const defaultRenderers: Record<string, (props: Record<string, any>) => JSX.Element> = {
  [Renderers.TEXT_LABEL]: ({text, ...props}: Record<string, any>) => (<span {...props}>{text}</span>),
  [Renderers.TEXT_TITLE]: ({text, ...props}: Record<string, any>) => (<h1 {...props}>{text}</h1>),
  [Renderers.TEXT_SUBTITLE]: ({text, ...props}: Record<string, any>) => (<h3 {...props}>{text}</h3>),
  [Renderers.TEXT_BODY]: ({text, ...props}: Record<string, any>) => (<p {...props}>{text}</p>),
  [Renderers.TEXT_INFO]: ({text, ...props}: Record<string, any>) => (<Info {...props}>{text}</Info>),
  [Renderers.TEXT_WARNING]: ({text, ...props}: Record<string, any>) => (<Warning {...props}>{text}</Warning>),
  [Renderers.TEXT_ERROR]: ({text, ...props}: Record<string, any>) => (<Error {...props}>{text}</Error>),

  [Renderers.BUTTON_PRIMARY]: ({text, ...props}: Record<string, any>) => (<button {...props}><Primary>{text}</Primary></button>),
  [Renderers.BUTTON_SECONDARY]: ({text, ...props}: Record<string, any>) => (<button {...props}><Secondary>{text}</Secondary></button>),
  [Renderers.BUTTON_WARNING]: ({text, ...props}: Record<string, any>) => (<button {...props}><Warning>{text}</Warning></button>),
  [Renderers.BUTTON_ERROR]: ({text, ...props}: Record<string, any>) => (<button {...props}><Error>{text}</Error></button>),
  [Renderers.BUTTON_INFO]: ({text, ...props}: Record<string, any>) => (<button {...props}><Info>{text}</Info></button>),

  [Renderers.FIELD_INPUT]: ({props, params, errors}) => (
    <>
      <div>
        <label>{params.label}</label>
      </div>
      <input {...params.input} {...props} />
      {errors.length > 0 && <Error>Validation failed {errors}</Error>}
    </>
  ),
  [Renderers.FIELD_TEXT_AREA]: ({props, params, errors}) => (
    <>
      <div>
        <label>{params.label}</label>
      </div>
      <textarea {...params.textarea} {...props}/>
      {errors.length > 0 && <Error>Validation failed {errors}</Error>}
    </>
  ),
  [Renderers.FIELD_CHECKBOX]: ({props, params, errors}) => (
    <>
      <div>
        <input id={params.key} {...params.input} {...props}/>
        <label htmlFor={params.key}>{params.label}</label>
      </div>
      {errors.length > 0 && <Error>Validation failed {errors}</Error>}
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
      {errors.length > 0 && <Error>Validation failed {errors}</Error>}
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
      {errors.length > 0 && <Error>Validation failed {errors}</Error>}
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