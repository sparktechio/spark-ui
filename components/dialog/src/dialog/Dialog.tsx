import React from 'react';
import * as RadixDialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import {Button, ButtonProps, PrimaryButton} from "@sparkui/react-theme";

export interface DialogProps extends RadixDialog.DialogProps {}

export const Dialog = (props: DialogProps) => {
  return <RadixDialog.Root {...props} />
}

export const Trigger = (props: ButtonProps) => {
  return <RadixDialog.Trigger asChild>
    <PrimaryButton {...props} />
  </RadixDialog.Trigger>;
}

export const Close = (props: ButtonProps) => {
  return <RadixDialog.Close asChild>
    <Button {...props} />
  </RadixDialog.Close>;
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
`;

const Actions = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 12px;
    width: 100%;
`;

const StyledOverlay = styled(RadixDialog.Overlay)`
    background-color: darkgrey;
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes overlayShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const StyledContent = styled(RadixDialog.Content)`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 12px;
    transform: translate(-50%, -50%);
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

export interface DialogContentProps extends RadixDialog.DialogContentProps {
  overlay?: React.ReactNode;
}

Dialog.Trigger = Trigger;
Dialog.Close = Close;
Dialog.Portal = RadixDialog.Portal;
Dialog.InlineContent = RadixDialog.Content;
Dialog.Overlay = StyledOverlay;
Dialog.Content = ({overlay = <StyledOverlay />, children, ...props}: DialogContentProps) => (
  <RadixDialog.Portal>
    {overlay}
    <StyledContent {...props}>
      {children}
    </StyledContent>
  </RadixDialog.Portal>
)
Dialog.Header = Header;
Dialog.Actions = Actions;
Dialog.Title = RadixDialog.Title;
Dialog.Description = RadixDialog.Description;
