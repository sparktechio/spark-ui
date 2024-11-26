import { fn } from '@storybook/test';
import {FormStory} from "./Form";

export default {
  title: 'Primitives/Form',
  component: FormStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {},
};
