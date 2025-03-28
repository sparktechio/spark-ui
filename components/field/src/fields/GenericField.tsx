import {BaseField, BaseFormFieldProps, FieldChildrenProps, FormFieldProps} from "./BaseField";
import React, {MutableRefObject, ReactNode} from "react";
import {FieldController, hasFieldsContext, StandaloneFieldProvider} from "../context/FieldsProvider";
import {useTheme, Renderer} from "@sparkui/react-theme";

export interface ThemeFormFieldProps<V, I, P, A> extends BaseFormFieldProps<V, I, P, A> {
  fieldControllerRef?: MutableRefObject<FieldController | undefined>;
  children?: (props: FieldChildrenProps<V, I, P, A>) => ReactNode;
  renderer?: string;
}

export interface GenericFieldProps<V, I, P, A> extends FormFieldProps<V, I, P, A> {
  fieldControllerRef?: MutableRefObject<FieldController | undefined>;
}

export const GenericField = <V, I, P, A>({children, fieldControllerRef, ...props}: GenericFieldProps<V, I, P, A>) => {
  const hasContext = hasFieldsContext();
  if (!hasContext) {
    return (
      <StandaloneFieldProvider fieldControllerRef={fieldControllerRef}>
        <BaseField<V, I, P, A> {...props}>{children}</BaseField>
      </StandaloneFieldProvider>
    );
  } else {
    return (<BaseField<V, I, P, A> {...props}>{children}</BaseField>);
  }
};

export const ThemeGenericField = <V, I, P = {}, A = {}>({renderer, children, ...props}: ThemeFormFieldProps<V, I, P, A>) => {
  const themeContext = useTheme();
  if (children){
    return (
      <GenericField<V, I, P, A> {...props}>
        {children}
      </GenericField>
    )
  } else if (themeContext && renderer) {
    return (
      <GenericField<V, I, P, A> {...props}>
        {(props) => (<Renderer name={renderer} props={props}/>)}
      </GenericField>
    );
  } else {
    console.error("Children or (renderer and theme provider) should be provided", props);
    return (<></>);
  }
}