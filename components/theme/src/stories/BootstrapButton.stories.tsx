import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Button, ErrorButton, InfoButton, PrimaryButton, SecondaryButton, WarningButton} from "../shared/Button";
import {BootstrapTheme} from "../examples";

export const ButtonPrimary = () => (
  <BootstrapTheme>
    <PrimaryButton onClick={console.log} children="Primary Text"/>
  </BootstrapTheme>
);

export const ButtonSecondary = () => (
  <BootstrapTheme>
    <SecondaryButton onClick={console.log} children="Secondary Text"/>
  </BootstrapTheme>
);

export const ButtonInfo = () => (
  <BootstrapTheme>
    <InfoButton onClick={console.log} children="Info Text"/>
  </BootstrapTheme>
);

export const ButtonError = () => (
  <BootstrapTheme>
    <ErrorButton onClick={console.log} children="Error Text"/>
  </BootstrapTheme>
);

export const ButtonWarning = () => (
  <BootstrapTheme>
    <WarningButton onClick={console.log} children="Warning Text"/>
  </BootstrapTheme>
);

export default {
  title: 'Bootstrap/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};