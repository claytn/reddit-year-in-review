import React, { useState } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { ThemeContext } from "../contexts";
import { lightTheme, darkTheme } from "../theme";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const App = ({ Component, ...props }) => {
  const [theme, setTheme] = useState(LIGHT_THEME);
  const toggleTheme = () => {
    if (theme === LIGHT_THEME) {
      setTheme(DARK_THEME);
    } else {
      setTheme(LIGHT_THEME);
    }
  };

  return (
    <StyledComponentsThemeProvider
      theme={theme === LIGHT_THEME ? lightTheme : darkTheme}
    >
      <ThemeContext.Provider value={[theme === DARK_THEME, toggleTheme]}>
        <Component {...props} />
      </ThemeContext.Provider>
    </StyledComponentsThemeProvider>
  );
};

export default App;
