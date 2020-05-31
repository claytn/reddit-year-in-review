const common = {
  breakpoints: [32, 48, 64, 80],
  fontWeights: {
    thin: "100",
    light: "200",
    regular: "300",
    medium: "400",
    semibold: "500",
    bold: "600"
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 72],
  radii: [0, 4, 8, 12, 16, 32],
  space: [0, 8, 16, 32, 64, 96, 128]
};

export const lightTheme = {
  colors: {
    bg: "#fff",
    text: "#000"
  },
  ...common
};

export const darkTheme = {
  colors: {
    bg: "#000",
    text: "#fff"
  },
  ...common
};
