import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const CardWrapper = styled.View`
  width: 100%;
  height: 400px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.View`
  width: 300px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const CardImage = styled.Image`
  width: 280px;
  height: 280px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
