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