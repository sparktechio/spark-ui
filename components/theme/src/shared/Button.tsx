import {Renderer} from "../context/Renderer";
import {Renderers} from "./Renderers";
import React from "react";

export const PrimaryButton = (props: Record<string, any>) => (
  <Renderer name={Renderers.BUTTON_PRIMARY} props={props} />
);

export const SecondaryButton = (props: Record<string, any>) => (
  <Renderer name={Renderers.BUTTON_SECONDARY} props={props} />
);

export const ErrorButton = (props: Record<string, any>) => (
  <Renderer name={Renderers.BUTTON_ERROR} props={props} />
);

export const InfoButton = (props: Record<string, any>) => (
  <Renderer name={Renderers.BUTTON_INFO} props={props} />
);

export const WarningButton = (props: Record<string, any>) => (
  <Renderer name={Renderers.BUTTON_WARNING} props={props} />
);