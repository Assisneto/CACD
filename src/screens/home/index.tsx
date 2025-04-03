import React, { useState, useRef, useEffect } from "react";
import { Text, Dimensions, Animated, PanResponder, View } from "react-native";

interface Question {
  number: number;
  text: string;
  answer: string;
}

interface CardItem {
  number: number;
  text: string;
  questions: Question[];
}

interface CardData {
  id: string;
  subject: string;
  questions: CardItem[];
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 120;

const data: CardData[] = [
  {
    id: "1",
    subject: "LÍNGUA PORTUGUESA ",
    questions: [
      {
        number: 1,
        text: `as nações latinas do Novo Mundo não se podem queixar de deslembradas. Cada incidente, ainda sem grande relevo,
encontra repercussão na imprensa europeia. Não aparecem, é verdade, nenhuns desses longos estudos, circunstanciados e sábios, onde
os mestres em assuntos internacionais dizem o que sabem sobre a história política, social e econômica do país de que se ocupam, para
daí deduzirem os seus juízos. Não; como de costume, sempre que se trata das repúblicas latino-americanas, os doutores e publicistas
da política mundial se limitam a lavrar sentenças — invariáveis e condenatórias. Como variantes dessas sentenças, eles se limitam a
ditar, de tempos em tempos, uns tantos conselhos axiomáticos`,
        questions: [
          {
            number: 1,
            text: `No terceiro período do texto, o termo "circunstanciados" se refere às condicionantes da produção do conhecimento científico da
época, ou às circunstâncias da epistemologia vigente.`,
            answer: "C"
          },
          {
            number: 2,
            text: `Na construção argumentativa do texto, o autor faz uma pausa retórica mediante o emprego do "Não" (quarto período), para
relativizar sua oposição ao conteúdo do período imediatamente anterior, e repete, nos dois últimos períodos, a expressão "se
limitam" com o propósito de reforçar sua crítica à visão eurocêntrica, por ele considerada superficial e pretensamente superior`,
            answer: "E"
          },
          {
            number: 3,
            text: `Infere-se do texto que as nações latino-americanas não são lembradas pela imprensa europeia, ou, quando o são, servem, no
máximo, como objeto de críticas, de "sentenças condenatórias".`,
            answer: "E"
          },
          {
            number: 4,
            text: `Segundo o autor do texto, cada incidente ocorrido na América Latina é objeto de estudos aprofundados destinados a lavrar
sentenças condenatórias.`,
            answer: "E"
          }
        ]
      },
      {
        number: 2,
        text: `Um senhor que conheci fez-se uma celebridade em astronomia, com auxílio dos saraus que lhe eram oferecidos pelos
amigos (...). E tudo isso com mais uns amigos dedicados a lhe oferecer bailes, por ocasião das suas portentosas descobertas nos céus
ignotos, levaram o governo da Bruzundanga a nomeá-lo diretor (...).
 Para obviar tais inconvenientes, houve alguém que teve a ideia de "canalizar", de "disciplinar" o entusiasmo do povo
bruzundanguense, entusiasmo tão necessário às manifestações que lá há constantemente, e tão indispensáveis são ao fabrico de
grandes homens que dirijam os destinos da grande e formosa República (...).`,
        questions: [
          {
            number: 1,
            text: `No segundo parágrafo, o autor assinala que alguém teve "a ideia de 'canalizar', de 'disciplinar' o entusiasmo do povo
bruzundanguense" com a finalidade de tornar óbvios os inconvenientes da prática de bailes e saraus para fabricar os "grandes
homens" da República.`,
            answer: "E"
          },
          {
            number: 2,
            text: `No segmento "nos céus ignotos" (segundo período do primeiro parágrafo), para expressar a natureza desconhecida do firmamento,
o narrador atribui aos "céus" uma qualidade intrinsecamente humana.`,
            answer: "E"
          },
          {
            number: 3,
            text: `Evidencia-se no texto o emprego de paradoxo, que remete, em sentido conotativo, ao oposto daquilo que de fato o narrador afirma.`,
            answer: "E"
          },
          {
            number: 4,
            text: `O termo "portentosas" (segundo período do primeiro parágrafo) poderia ser substituído no texto, sem prejuízo da coerência de suas
ideias, por assombrosas.`,
            answer: "E"
          }
        ]
      }
      // Outras questões...
    ]
  }
];

const Home: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSwipingEnabled, setIsSwipingEnabled] = useState(true);

  const position = useRef(new Animated.ValueXY()).current;

  // Animações para os indicadores de swipe
  const rightOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const leftOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp"
  });

  const stateRef = useRef({
    currentCardIndex,
    currentItemIndex,
    currentQuestionIndex
  });

  useEffect(() => {
    stateRef.current = {
      currentCardIndex,
      currentItemIndex,
      currentQuestionIndex
    };
  }, [currentCardIndex, currentItemIndex, currentQuestionIndex]);

  const currentCard = data[currentCardIndex];
  const currentCardItem = currentCard?.questions[currentItemIndex];
  const currentQuestion = currentCardItem?.questions[currentQuestionIndex];

  // Reseta a posição sempre que a questão muda
  useEffect(() => {
    position.setValue({ x: 0, y: 0 });
    setIsSwipingEnabled(true);
  }, [currentQuestionIndex, currentCardIndex, currentItemIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isSwipingEnabled,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          processSwipe("right"); // Resposta C
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          processSwipe("left"); // Resposta E
        } else {
          resetCardPosition();
        }
      }
    })
  ).current;

  const resetCardPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false
    }).start();
  };

  const processSwipe = (direction: string) => {
    setIsSwipingEnabled(false);
    const x = direction === "right" ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 300,
      useNativeDriver: false
    }).start();

    const selectedAnswer = direction === "right" ? "C" : "E";
    const isCorrect = selectedAnswer === currentQuestion?.answer;
    setFeedback(isCorrect ? "Correto!" : "Incorreto!");

    setTimeout(() => {
      const { currentCardIndex, currentItemIndex, currentQuestionIndex } =
        stateRef.current;
      const currentCard = data[currentCardIndex];
      const currentCardItem = currentCard.questions[currentItemIndex];
      const totalQuestionsInItem = currentCardItem.questions.length;
      const totalItemsInCard = currentCard.questions.length;
      const totalCards = data.length;

      if (currentQuestionIndex < totalQuestionsInItem - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (currentItemIndex < totalItemsInCard - 1) {
        setCurrentItemIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      } else if (currentCardIndex < totalCards - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        setCurrentItemIndex(0);
        setCurrentQuestionIndex(0);
      } else {
        setFeedback("Todas as questões foram respondidas!");
      }

      setTimeout(() => {
        setFeedback(null);
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false
        }).start(() => {
          setIsSwipingEnabled(true);
        });
      }, 50);
    }, 500);
  };

  if (!currentCard || !currentCardItem || !currentQuestion) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text className="text-2xl font-bold mb-5">Gambito App</Text>
        <Text>Não há questões disponíveis</Text>
      </View>
    );
  }

  const cardStyle = {
    transform: [{ translateX: position.x }, { rotate: rotation }]
  };

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-2xl font-bold mb-5">Gambito App</Text>
      <View className="w-full h-[400px] relative justify-center items-center">
        <Animated.View
          className="w-[300px] h-[400px] absolute"
          style={cardStyle}
          {...panResponder.panHandlers}
        >
          <View className="w-[300px] h-[400px] bg-white rounded-lg justify-center items-center">
            <View className="p-4 border-b border-background max-h-[40%]">
              <Text className="text-base mb-2.5">{currentCardItem.text}</Text>
            </View>
            <View className="p-4 flex-1">
              <Text className="font-bold mb-1">Questão {currentQuestion.number}</Text>
              <Text className="text-[15px] mb-5">{currentQuestion.text}</Text>
              <View className="items-center mt-2.5">
                <Text className="text-textSecondary text-sm">
                  Deslize para a direita (C) ou para a esquerda (E)
                </Text>
              </View>
              <View className="flex-row justify-between mt-5">
                <Animated.View
                  className="w-10 h-10 rounded-full justify-center items-center bg-red-200/20"
                  style={{ opacity: leftOpacity }}
                >
                  <Text className="font-bold text-lg">E</Text>
                </Animated.View>
                <Animated.View
                  className="w-10 h-10 rounded-full justify-center items-center bg-green-200/20"
                  style={{ opacity: rightOpacity }}
                >
                  <Text className="font-bold text-lg">C</Text>
                </Animated.View>
              </View>
              {feedback && (
                <View
                  className={`mt-4 p-2.5 rounded-md items-center ${
                    feedback === "Correto!" ? "bg-green-500/20" : "bg-red-500/20"
                  }`}
                >
                  <Text className="font-bold">{feedback}</Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Home;
