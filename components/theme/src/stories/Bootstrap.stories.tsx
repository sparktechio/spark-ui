import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {Renderer} from "../context/Renderer";
import {ErrorText, InfoText, LabelText, SubtitleText, Text, TitleText, WarningText} from "../shared/Text";
import {ErrorButton, InfoButton, PrimaryButton, SecondaryButton, WarningButton} from "../shared/Button";
import {BootstrapTheme} from "../shared/BootstrapTheme";

export const TextTitle = () => (
  <BootstrapTheme>
    <TitleText children="Title Text"/>
  </BootstrapTheme>
);

export const TextSubtitle = () => (
  <BootstrapTheme>
    <SubtitleText children="Subtitle Text"/>
  </BootstrapTheme>
);

export const TextLabel = () => (
  <BootstrapTheme>
    <LabelText children="Label Text"/>
  </BootstrapTheme>
);

export const TextBody = () => (
  <BootstrapTheme>
    <Text children="Body Text"/>
  </BootstrapTheme>
);

export const TextError = () => (
  <BootstrapTheme>
    <ErrorText children="Error Text"/>
  </BootstrapTheme>
);

export const TextWarning = () => (
  <BootstrapTheme>
    <WarningText children="Warning Text"/>
  </BootstrapTheme>
);

export const TextInfo = () => (
  <BootstrapTheme>
    <InfoText>Info Text</InfoText>
  </BootstrapTheme>
);

export default {
  title: 'Bootstrap/Text',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};