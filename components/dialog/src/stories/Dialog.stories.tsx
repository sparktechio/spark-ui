import React from "react";
import {Dialog} from "../dialog/Dialog";
import styled from "styled-components";

export const BasicDialog = () => (
  <Dialog>
    <Dialog.Trigger asChild>
      <button>Open</button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Wrapper>
        <Dialog.Title>
          Title
        </Dialog.Title>
        <Dialog.Description>
          Description
        </Dialog.Description>
        <Dialog.Close>
          Close
        </Dialog.Close>
      </Wrapper>
    </Dialog.Content>
  </Dialog>
);

const Wrapper = styled.div`
    padding: 16px;
`

export default {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};