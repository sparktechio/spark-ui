import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {ThemeProvider} from "../context/ThemeProvider";
import {Renderer} from "../context/Renderer";

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

export const Theme = () => (
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
)

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