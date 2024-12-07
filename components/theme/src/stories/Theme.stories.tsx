import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {Renderer} from "../context/Renderer";
import {ErrorText, InfoText, LabelText, SubtitleText, Text, TitleText, WarningText} from "../shared/Text";
import {ErrorButton, InfoButton, PrimaryButton, SecondaryButton, WarningButton} from "../shared/Button";

export const TextTitle = () => (
  <ThemeProvider>
    <TitleText text="Title Text"/>
  </ThemeProvider>
);

export const TextSubtitle = () => (
  <ThemeProvider>
    <SubtitleText text="Subtitle Text"/>
  </ThemeProvider>
);

export const TextLabel = () => (
  <ThemeProvider>
    <LabelText text="Label Text"/>
  </ThemeProvider>
);

export const TextBody = () => (
  <ThemeProvider>
    <Text text="Body Text"/>
  </ThemeProvider>
);

export const TextError = () => (
  <ThemeProvider>
    <ErrorText text="Error Text"/>
  </ThemeProvider>
);

export const TextWarning = () => (
  <ThemeProvider>
    <WarningText text="Warning Text"/>
  </ThemeProvider>
);

export const TextInfo = () => (
  <ThemeProvider>
    <InfoText text="Info Text"/>
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