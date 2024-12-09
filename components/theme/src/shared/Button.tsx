import {Renderer} from "../context/Renderer";
import {Renderers} from "./Renderers";
import React, {ButtonHTMLAttributes} from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  renderer?: string;
}

export const Button = ({renderer, ...props}: ButtonProps) => (
  <Renderer name={renderer ?? Renderers.BUTTON} props={props} />
);

export const PrimaryButton = ({renderer, ...props}: ButtonProps) => (
  <Renderer name={renderer ?? Renderers.BUTTON_PRIMARY} props={props} />
);

export const SecondaryButton = ({renderer, ...props}: ButtonProps) => (
  <Renderer name={renderer ?? Renderers.BUTTON_SECONDARY} props={props} />
);

export const ErrorButton = ({renderer, ...props}: ButtonProps) => (
  <Renderer name={renderer ?? Renderers.BUTTON_ERROR} props={props} />
);

export const InfoButton = ({renderer, ...props}: ButtonProps) => (
  <Renderer name={renderer ?? Renderers.BUTTON_INFO} props={props} />
);

export const WarningButton = ({renderer, ...props}: ButtonProps) => (
  <Renderer name={renderer ?? Renderers.BUTTON_WARNING} props={props} />
);