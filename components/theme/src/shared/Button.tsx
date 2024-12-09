import {Renderer} from "../context/Renderer";
import {Renderers} from "./Renderers";
import React, {ButtonHTMLAttributes} from "react";

export const PrimaryButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Renderer name={Renderers.BUTTON_PRIMARY} props={props} />
);

export const SecondaryButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Renderer name={Renderers.BUTTON_SECONDARY} props={props} />
);

export const ErrorButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Renderer name={Renderers.BUTTON_ERROR} props={props} />
);

export const InfoButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Renderer name={Renderers.BUTTON_INFO} props={props} />
);

export const WarningButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Renderer name={Renderers.BUTTON_WARNING} props={props} />
);