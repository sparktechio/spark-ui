import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {Renderer} from "../context/Renderer";
import {Error, Info, Label, Subtitle, Text, Title, Warning} from "../shared/Text";
import {ErrorButton, InfoButton, PrimaryButton, SecondaryButton, WarningButton} from "../shared/Button";

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

export const TitleText = () => (
  <ThemeProvider>
    <Title text="Title Text"/>
  </ThemeProvider>
);

export const SubtitleText = () => (
  <ThemeProvider>
    <Subtitle text="Subtitle Text"/>
  </ThemeProvider>
);

export const LabelText = () => (
  <ThemeProvider>
    <Label text="Label Text"/>
  </ThemeProvider>
);

export const BodyText = () => (
  <ThemeProvider>
    <Text text="Body Text"/>
  </ThemeProvider>
);

export const ErrorText = () => (
  <ThemeProvider>
    <Error text="Error Text"/>
  </ThemeProvider>
);

export const WarningText = () => (
  <ThemeProvider>
    <Warning text="Warning Text"/>
  </ThemeProvider>
);

export const InfoText = () => (
  <ThemeProvider>
    <Info text="Info Text"/>
  </ThemeProvider>
);

export const ButtonPrimary = () => (
  <ThemeProvider>
    <PrimaryButton onClick={console.log} text="Primary Text"/>
  </ThemeProvider>
);

export const ButtonSecondary = () => (
  <ThemeProvider>
    <SecondaryButton onClick={console.log} text="Secondary Text"/>
  </ThemeProvider>
);

export const ButtonInfo = () => (
  <ThemeProvider>
    <InfoButton onClick={console.log} text="Info Text"/>
  </ThemeProvider>
);

export const ButtonError = () => (
  <ThemeProvider>
    <ErrorButton onClick={console.log} text="Error Text"/>
  </ThemeProvider>
);

export const ButtonWarning = () => (
  <ThemeProvider>
    <WarningButton onClick={console.log} text="Warning Text"/>
  </ThemeProvider>
);

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
  title: 'Components/Theme',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};