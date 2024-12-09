import {Renderer} from "../context/Renderer";
import React, {HTMLAttributes} from "react";
import {Renderers} from "./Renderers";

export interface TextProps extends HTMLAttributes<HTMLSpanElement|HTMLDivElement> {
  renderer?: string;
}

export const Text = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT} props={props} />
);

export const TitleText = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT_TITLE} props={props} />
);

export const SubtitleText = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT_SUBTITLE} props={props} />
);

export const LabelText = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT_LABEL} props={props} />
);

export const ErrorText = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT_ERROR} props={props} />
);

export const WarningText = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT_WARNING} props={props} />
);

export const InfoText = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT_INFO} props={props} />
);

export const BodyText = ({renderer, ...props}: TextProps) => (
  <Renderer name={renderer ?? Renderers.TEXT_BODY} props={props} />
);