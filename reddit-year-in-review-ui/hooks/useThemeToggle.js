import { useState } from "react";
import { lightTheme, darkTheme } from "../theme";

const useThemeToggle = (defaultTheme = "light") => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return [theme === "light" ? lightTheme : darkTheme, toggleTheme];
};

export default useThemeToggle;
