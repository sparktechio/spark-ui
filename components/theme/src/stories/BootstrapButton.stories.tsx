import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {Renderer} from "../context/Renderer";
import {ErrorButton, InfoButton, PrimaryButton, SecondaryButton, WarningButton} from "../shared/Button";
import {BootstrapTheme} from "../shared/BootstrapTheme";

export const ButtonPrimary = () => (
  <BootstrapTheme>
    <PrimaryButton onClick={console.log} text="Primary Text"/>
  </BootstrapTheme>
);

export const ButtonSecondary = () => (
  <BootstrapTheme>
    <SecondaryButton onClick={console.log} text="Secondary Text"/>
  </BootstrapTheme>
);

export const ButtonInfo = () => (
  <BootstrapTheme>
    <InfoButton onClick={console.log} text="Info Text"/>
  </BootstrapTheme>
);

export const ButtonError = () => (
  <BootstrapTheme>
    <ErrorButton onClick={console.log} text="Error Text"/>
  </BootstrapTheme>
);

export const ButtonWarning = () => (
  <BootstrapTheme>
    <WarningButton onClick={console.log} text="Warning Text"/>
  </BootstrapTheme>
);

export default {
  title: 'Bootstrap/Button',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};