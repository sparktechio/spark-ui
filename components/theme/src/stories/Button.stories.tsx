import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {Renderer} from "../context/Renderer";
import {ErrorButton, InfoButton, PrimaryButton, SecondaryButton, WarningButton} from "../shared/Button";

export const ButtonPrimary = () => (
  <ThemeProvider>
    <PrimaryButton onClick={console.log} children="Primary Text"/>
  </ThemeProvider>
);

export const ButtonSecondary = () => (
  <ThemeProvider>
    <SecondaryButton onClick={console.log} children="Secondary Text"/>
  </ThemeProvider>
);

export const ButtonInfo = () => (
  <ThemeProvider>
    <InfoButton onClick={console.log} children="Info Text"/>
  </ThemeProvider>
);

export const ButtonError = () => (
  <ThemeProvider>
    <ErrorButton onClick={console.log} children="Error Text"/>
  </ThemeProvider>
);

export const ButtonWarning = () => (
  <ThemeProvider>
    <WarningButton onClick={console.log} children="Warning Text"/>
  </ThemeProvider>
);

const Button = () => {
  return <Renderer
    name='my-submit'
    props={
      {
        props: {className: "btn btn-primary p-2", onClick: console.log},
        params: {title: 'Submit'}
      }
    }
  />
}

export const Custom = () => (
  <ThemeProvider
    renderers={
      {
        'my-submit': ({props, params}) => (
          <button {...props}>{params.title}</button>
        )
      }
    }
  >
    <Button />
  </ThemeProvider>
);

export default {
  title: 'Default/Button',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};