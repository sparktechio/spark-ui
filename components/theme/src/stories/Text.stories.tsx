import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {ErrorText, InfoText, LabelText, SubtitleText, Text, TitleText, WarningText} from "../shared/Text";

export const TextTitle = () => (
  <ThemeProvider>
    <TitleText children="Title Text"/>
  </ThemeProvider>
);

export const TextSubtitle = () => (
  <ThemeProvider>
    <SubtitleText children="Subtitle Text"/>
  </ThemeProvider>
);

export const TextLabel = () => (
  <ThemeProvider>
    <LabelText children="Label Text"/>
  </ThemeProvider>
);

export const TextBody = () => (
  <ThemeProvider>
    <Text children="Body Text"/>
  </ThemeProvider>
);

export const TextError = () => (
  <ThemeProvider>
    <ErrorText children="Error Text"/>
  </ThemeProvider>
);

export const TextWarning = () => (
  <ThemeProvider>
    <WarningText children="Warning Text"/>
  </ThemeProvider>
);

export const TextInfo = () => (
  <ThemeProvider>
    <InfoText children="Info Text"/>
  </ThemeProvider>
);

export default {
  title: 'Default/Text',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};