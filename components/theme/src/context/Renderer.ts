import {useTheme} from "./ThemeProvider";
import {useId} from "react";

export interface RendererProps {
  name: string;
  props?: Record<string, any>;
}

export const Renderer = ({name, props = {}}: RendererProps) => {
  const {render} = useTheme();
  const id = useId();
  return render(name, id, props);
}