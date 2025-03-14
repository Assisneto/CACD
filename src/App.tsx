import { ThemeProvider } from "./theme/themeProvider";
import Home from "./screens/home";

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
