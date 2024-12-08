import React from 'react';
import * as RadixDialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export interface DialogProps extends RadixDialog.DialogProps {}

export const Dialog = (props: DialogProps) => {
  return <RadixDialog.Root {...props} />
}

export interface DialogTriggerProps extends RadixDialog.DialogTriggerProps {}

export const Trigger = (props: DialogTriggerProps) => {
  return <RadixDialog.Trigger {...props} />;
}

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
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
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
Dialog.Title = RadixDialog.Title;
Dialog.Description = RadixDialog.Description;
Dialog.Close = RadixDialog.Close;
