import {useTheme} from "./ThemeProvider";
import {useId} from "react";

export interface RendererProps<P> {
  name: string;
  props?: P;
}

export const Renderer = <P,>({name, props = {} as P}: RendererProps<P>) => {
  const {render} = useTheme();
  const id = useId();
  return render(name, id, props);
}