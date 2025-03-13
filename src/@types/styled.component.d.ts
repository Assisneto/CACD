import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      error: string;
      textPrimary: string;
      textSecondary: string;
    };
  }
}
