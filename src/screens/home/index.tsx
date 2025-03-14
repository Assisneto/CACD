import React from "react";
import { Text } from "react-native";
import TinderCard from "react-tinder-card";
import { Container, Title, CardWrapper, Card, CardImage } from "./styles";

interface CardData {
  id: string;
  name: string;
  image: string;
}

const data: CardData[] = [
  {
    id: "1",
    name: "",
    image: `as nações latinas do Novo Mundo não se podem queixar de deslembradas. Cada incidente, ainda sem grande relevo,
encontra repercussão na imprensa europeia. Não aparecem, é verdade, nenhuns desses longos estudos, circunstanciados e sábios, onde
os mestres em assuntos internacionais dizem o que sabem sobre a história política, social e econômica do país de que se ocupam, para
daí deduzirem os seus juízos. Não; como de costume, sempre que se trata das repúblicas latino-americanas, os doutores e publicistas
da política mundial se limitam a lavrar sentenças — invariáveis e condenatórias. Como variantes dessas sentenças, eles se limitam a
ditar, de tempos em tempos, uns tantos conselhos axiomáticos`
  },
  {
    id: "2",
    name: "",
    image: `as nações latinas do Novo Mundo não se podem queixar de deslembradas. Cada incidente, ainda sem grande relevo,
    encontra repercussão na imprensa europeia. Não aparecem, é verdade, nenhuns desses longos estudos, circunstanciados e sábios, onde
    os mestres em assuntos internacionais dizem o que sabem sobre a história política, social e econômica do país de que se ocupam, para
    daí deduzirem os seus juízos. Não; como de costume, sempre que se trata das repúblicas latino-americanas, os doutores e publicistas
    da política mundial se limitam a lavrar sentenças — invariáveis e condenatórias. Como variantes dessas sentenças, eles se limitam a
    ditar, de tempos em tempos, uns tantos conselhos axiomáticos`
  }
  // Add more data as needed
];

const Home: React.FC = () => {
  const onSwipe = (direction: string) => {
    console.log(`Swiped: ${direction}`);
  };

  const onCardLeftScreen = (name: string) => {
    console.log(`${name} left the screen`);
  };

  return (
    <Container>
      <Title>Gambito App</Title>
      <CardWrapper>
        {data.map((item) => (
          <TinderCard
            key={item.id}
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen(item.name)}
            preventSwipe={["up", "down"]}
          >
            <Card>
              <Text>{item.name}</Text>
              <Text>{item.image}</Text>
            </Card>
          </TinderCard>
        ))}
      </CardWrapper>
    </Container>
  );
};

export default Home;
