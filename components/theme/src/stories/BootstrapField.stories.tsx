import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Renderer} from "../context/Renderer";
import {Renderers} from "../shared/Renderers";
import {BootstrapTheme} from "../shared/BootstrapTheme";

export const Input = () => (
  <BootstrapTheme>
    <Renderer name={Renderers.FIELD_TEXT} props={{errors: [], props: {}, params: {label: 'Sample', input: {onBlur: console.log}}}} />
  </BootstrapTheme>
);

export const CheckBox = () => (
  <BootstrapTheme>
    <Renderer name={Renderers.FIELD_CHECKBOX} props={{errors: [], props: {type:'checkbox', onChange: console.log}, params: {label: 'Sample'}}} />
  </BootstrapTheme>
);

export const Select = () => (
  <BootstrapTheme>
    <Renderer name={Renderers.FIELD_SELECT} props={{errors: [], props: {onChange: console.log}, params: [
        {value: 1, label: 'First'},
        {value: 2, label: 'Second'}
      ]}} />
  </BootstrapTheme>
);

export default {
  title: 'Bootstrap/Field',
  component: Renderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};