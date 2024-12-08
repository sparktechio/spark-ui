import {useThemeContext} from "./ThemeProvider";

export interface RendererProps {
  name: string;
  props?: Record<string, any>;
}

export const Renderer = ({name, props = {}}: RendererProps) => {
  const {render} = useThemeContext();
  return render(name, props);
}