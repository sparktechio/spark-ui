import 'bootstrap/dist/css/bootstrap.min.css';
import {IsDefined} from "./IsDefined";
import React from 'react';

export const Simple = () => (<IsDefined />);

export default {
  title: 'Components/IsDefined',
  component: IsDefined,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};