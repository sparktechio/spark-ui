import {Renderer} from "../context/Renderer";
import React from "react";
import {Renderers} from "./Renderers";

export const TitleText = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_TITLE} props={props} />
);

export const SubtitleText = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_SUBTITLE} props={props} />
);

export const LabelText = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_LABEL} props={props} />
);

export const ErrorText = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_ERROR} props={props} />
);

export const WarningText = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_WARNING} props={props} />
);

export const InfoText = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_INFO} props={props} />
);

export const Text = (props: Record<string, any>) => (
  <Renderer name={Renderers.TEXT_BODY} props={props} />
);