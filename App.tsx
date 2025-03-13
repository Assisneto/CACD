import { StatusBar } from 'expo-status-bar';
import {  Text,  } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: #224123;
`;

export default function App() {
  return (
    <Container>
      <Text>Gambito App</Text>
      <StatusBar style="auto" />
    </Container>
  );
}
