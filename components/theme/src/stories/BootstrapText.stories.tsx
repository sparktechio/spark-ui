import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {BodyText, ErrorText, InfoText, LabelText, SubtitleText, Text, TitleText, WarningText} from "../shared/Text";
import {BootstrapTheme} from "../examples";

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

export const TextBody = () => (
  <BootstrapTheme>
    <BodyText>Body Text</BodyText>
  </BootstrapTheme>
);

export default {
  title: 'Bootstrap/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};