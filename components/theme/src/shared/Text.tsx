import {Renderer} from "../context/Renderer";
import React from "react";
import {Renderers} from "./Renderers";

export const Title = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_TITLE} props={props} />
);

export const Subtitle = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_SUBTITLE} props={props} />
);

export const Label = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_LABEL} props={props} />
);

export const Error = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_ERROR} props={props} />
);

export const Warning = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_WARNING} props={props} />
);

export const Info = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_INFO} props={props} />
);

export const Text = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_BODY} props={props} />
);