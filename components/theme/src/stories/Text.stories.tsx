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

export default {
  title: 'Components/Text',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};