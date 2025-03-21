import styled from "styled-components/native";
import { Animated } from "react-native";
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
  justify-content: center;
  align-items: center;
`;

export const CardImage = styled.Image`
  width: 280px;
  height: 280px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
export const AnimatedCard = styled(Animated.View)`
  width: 300px;
  height: 400px;
  position: absolute;
`;

export const UpperSection = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.background};
  max-height: 40%;
`;

export const MainText = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const LowerSection = styled.View`
  padding: 15px;
  flex: 1;
`;

export const QuestionNumber = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const QuestionText = styled.Text`
  font-size: 15px;
  margin-bottom: 20px;
`;

export const InstructionContainer = styled.View`
  align-items: center;
  margin-top: 10px;
`;

export const InstructionText = styled.Text`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 14px;
`;

export const FeedbackContainer = styled.View<{ correct?: boolean }>`
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  background-color: ${({ correct }) =>
    correct ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"};
`;

export const FeedbackText = styled.Text`
  font-weight: bold;
`;

export const IndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const AnimatedIndicator = styled(Animated.View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const AnimatedLeftIndicator = styled(AnimatedIndicator)`
  background-color: rgba(244, 67, 54, 0.2);
`;

export const AnimatedRightIndicator = styled(AnimatedIndicator)`
  background-color: rgba(76, 175, 80, 0.2);
`;

export const IndicatorText = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
