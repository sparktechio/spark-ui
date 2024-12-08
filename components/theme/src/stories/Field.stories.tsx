import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {Renderer} from "../context/Renderer";
import {Renderers} from "../shared/Renderers";

export const Input = () => (
  <ThemeProvider>
    <Renderer name={Renderers.FIELD_TEXT} props={{errors: [], props: {}, params: {label: 'Sample', input: {onBlur: console.log}}}} />
  </ThemeProvider>
);

export const Select = () => (
  <ThemeProvider>
    <Renderer name={Renderers.FIELD_SELECT} props={{errors: [], props: {onChange: console.log}, params: [
        {value: 1, label: 'First'},
        {value: 2, label: 'Second'}
      ]}} />
  </ThemeProvider>
);

export default {
  title: 'Default/Field',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};