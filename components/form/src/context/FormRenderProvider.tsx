import React, {createContext, JSX, ReactNode, useContext} from "react";
import {ElementProps} from "../fields/FormField";
import {SubmitChildrenProps} from "../fields/FormSubmit";

export interface FormRenderContextProps {
  renderField: (renderer: string, props: ElementProps<any, any>) => JSX.Element;
  renderSubmit: (renderer: string, props: SubmitChildrenProps) => JSX.Element;
}

export interface FormRenderContextProviderProps {
  fieldRenderers: Record<string, (props: ElementProps<any, any>) => JSX.Element>;
  submitRenderers: Record<string, (props: SubmitChildrenProps) => JSX.Element>;
  children: ReactNode;
}

export const FormRenderContext = createContext<FormRenderContextProps>({
  renderField: () => (<></>),
  renderSubmit: () => (<></>)
});

export const useFormRenderContext = () => useContext(FormRenderContext);

export const FormRenderProvider = (
  {
    fieldRenderers,
    submitRenderers,
    children,
  }: FormRenderContextProviderProps
) => {

  const renderField = (name: string, props: ElementProps<any, any>) => {
    const renderer = fieldRenderers[name];
    if (renderer) {
      return renderer(props);
    } else {
      console.error(`Field renderer with name ${name} not found. If you wan to render this element automatically configure it in the FormRenderProvider`);
      return (<></>);
    }
  };

  const renderSubmit = (name: string, props: SubmitChildrenProps) => {
    const renderer = submitRenderers[name];
    if (renderer) {
      return renderer(props);
    } else {
      console.error(`Submit renderer with name ${name} not found. If you wan to render this element automatically configure it in the FormRenderProvider`);
      return (<></>);
    }
  };

  return (
    <FormRenderContext.Provider value={{renderField, renderSubmit}}>
      {children}
    </FormRenderContext.Provider>
  );
};
