import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import styled from "styled-components/native";
import { ThemeProvider } from "./theme/themeProvider";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export default function App() {
  return (
    <ThemeProvider>
      <Container>
        <Text>Gambito App</Text>
        <StatusBar style="auto" />
      </Container>
    </ThemeProvider>
  );
}
