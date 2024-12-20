"use client"

import React, {createContext, JSX, ReactNode, useContext} from "react";
import {defaultRenderers} from "../shared/Renderers";

export interface ThemeContextProps<C extends Color, S extends Space, P> {
  colors?: C;
  spaces?: S;
  render: (renderer: string, id: string, props: P) => JSX.Element;
}

export interface Color extends Record<string, string> {}

export interface Space extends Record<string, string> {}

export interface ThemeProviderProps<C extends Color, S extends Space> {
  colors?: C;
  spaces?: S;
  renderers?: Record<string, (props: Record<string, any>) => JSX.Element>;
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps<Record<string, string>, Record<string, string>, any>>({
  colors: {},
  spaces: {},
  render: () => (<></>),
});

export const useTheme = <C extends Color, S extends Space, P>() => useContext(ThemeContext) as ThemeContextProps<C, S, P>;

export const ThemeProvider = <C extends Color, S extends Space>(
  {
    colors = {} as C,
    spaces = {} as S,
    renderers = {},
    children,
  }: ThemeProviderProps<C, S>
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
    <ThemeContext.Provider value={{render, colors, spaces}}>
      {children}
    </ThemeContext.Provider>
  );
};
