import React from "react";
import {Dialog} from "../dialog/Dialog";
import styled from "styled-components";
import {BootstrapTheme, PrimaryButton} from "@sparkui/react-theme";

export const BasicDialog = () => (
  <BootstrapTheme>
    <Dialog>
      <Dialog.Trigger>
        Open
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            Title
          </Dialog.Title>

          <Dialog.Close>
            X
          </Dialog.Close>
        </Dialog.Header>
        <Dialog.Description>
          <Wrapper>
            Description
          </Wrapper>
        </Dialog.Description>
        <Dialog.Actions>
          <PrimaryButton>
            Save
          </PrimaryButton>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  </BootstrapTheme>
);

const Wrapper = styled.div`
    padding: 116px;
`;

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