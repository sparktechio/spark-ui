import React, {createContext, JSX, ReactNode, useContext} from "react";

export interface ThemeContextProps {
  render: (renderer: string, props: Record<string, any>) => JSX.Element;
}

export interface ThemeContextProviderProps {
  renderers: Record<string, (props: Record<string, any>) => JSX.Element>;
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({
  render: (name: string, props: Record<string, any>) => (<></>),
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = (
  {
    renderers,
    children,
  }: ThemeContextProviderProps
) => {

  const render = (name: string, props: Record<string, any>) => {
    const renderer = renderers[name];
    if (renderer) {
      return renderer(props);
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
