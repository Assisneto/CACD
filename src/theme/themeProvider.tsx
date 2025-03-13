// src/theme/ThemeProvider.tsx
import React, { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { theme } from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
