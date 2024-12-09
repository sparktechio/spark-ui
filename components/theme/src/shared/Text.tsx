import {Renderer} from "../context/Renderer";
import React, {HTMLAttributes} from "react";
import {Renderers} from "./Renderers";

export const TitleText = (props: HTMLAttributes<HTMLSpanElement>) => (
  <Renderer name={Renderers.TEXT_TITLE} props={props} />
);

export const SubtitleText = (props: HTMLAttributes<HTMLSpanElement>) => (
  <Renderer name={Renderers.TEXT_SUBTITLE} props={props} />
);

export const LabelText = (props: HTMLAttributes<HTMLSpanElement>) => (
  <Renderer name={Renderers.TEXT_LABEL} props={props} />
);

export const ErrorText = (props: HTMLAttributes<HTMLSpanElement>) => (
  <Renderer name={Renderers.TEXT_ERROR} props={props} />
);

export const WarningText = (props: HTMLAttributes<HTMLSpanElement>) => (
  <Renderer name={Renderers.TEXT_WARNING} props={props} />
);

export const InfoText = (props: HTMLAttributes<HTMLSpanElement>) => (
  <Renderer name={Renderers.TEXT_INFO} props={props} />
);

export const Text = (props: HTMLAttributes<HTMLSpanElement>) => (
  <Renderer name={Renderers.TEXT_BODY} props={props} />
);