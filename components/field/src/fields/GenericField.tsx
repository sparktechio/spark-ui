import {BaseField, BaseFormFieldProps, FieldChildrenProps, FormFieldProps} from "./BaseField";
import React, {JSX, MutableRefObject} from "react";
import {FieldController, FieldSetProvider, hasFieldSetContext} from "../context/FieldSetProvider";
import {useThemeContext} from "@sparkui/react-theme";

export interface ThemeFormFieldProps<V, I> extends BaseFormFieldProps<V, I> {
  fieldControllerRef?: MutableRefObject<FieldController | undefined>;
  children?: (props: FieldChildrenProps<V, I>) => JSX.Element;
  renderer?: string;
}

export interface GenericFieldProps<V, I> extends FormFieldProps<V, I> {
  fieldControllerRef?: MutableRefObject<FieldController | undefined>;
}

export const GenericField = <V, I>({children, fieldControllerRef, ...props}: GenericFieldProps<V, I>) => {
  const hasContext = hasFieldSetContext();
  if (hasContext) {
    return (
      <FieldSetProvider fieldControllerRef={fieldControllerRef}>
        <BaseField<V, I> {...props}>{children}</BaseField>
      </FieldSetProvider>
    );
  } else {
    return (<BaseField<V, I> {...props}>{children}</BaseField>);
  }
};

export const ThemeGenericField = <V, I>({renderer, children, ...props}: ThemeFormFieldProps<V, I>) => {
  const themeContext = useThemeContext();
  if (themeContext && renderer) {
    const {render} = themeContext;
    return (
      <GenericField<V, I> {...props}>
        {(props) => render(renderer, props)}
      </GenericField>
    );
  } else if (children){
    return (
      <GenericField<V, I> {...props}>
        {children}
      </GenericField>
    )
  } else {
    console.error("Children or (renderer and theme provider) should be provided", props);
    return (<></>);
  }
}