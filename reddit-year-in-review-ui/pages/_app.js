import { ThemeProvider } from "styled-components";
import { useThemeToggle } from "../hooks";

const App = ({ Component, ...props }) => {
  const [theme, toggleTheme] = useThemeToggle();

  return (
    <ThemeProvider theme={theme}>
      <button onClick={toggleTheme}>theme me</button>
      <Component {...props} />
    </ThemeProvider>
  );
};

export default App;
