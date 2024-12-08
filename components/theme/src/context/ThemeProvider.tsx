import React, {createContext, JSX, ReactNode, useContext} from "react";
import {defaultRenderers} from "../shared/Renderers";

export interface ThemeContextProps {
  render: (renderer: string, id: string, props: Record<string, any>) => JSX.Element;
}

export interface ThemeProviderProps {
  renderers?: Record<string, (props: Record<string, any>) => JSX.Element>;
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({
  render: () => (<></>),
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = (
  {
    renderers = {},
    children,
  }: ThemeProviderProps
) => {

  const render = (name: string, id: string, props: Record<string, any>) => {
    const renderer = renderers[name] ?? defaultRenderers[name];
    if (renderer) {
      return renderer({id, ...props});
    } else {
      console.error(`Field renderer with name ${name} not found. If you wan to render this element automatically configure it in the FormRenderProvider`);
      return (<></>);
    }
  };

  return (
    <ThemeContext.Provider value={{render}}>
      {children}
    </ThemeContext.Provider>
  );
};
