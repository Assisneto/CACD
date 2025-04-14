import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  Dimensions,
  Animated,
  PanResponder,
  View,
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  Home: undefined;
  TinderCard: { disciplineId: string };
};

type TinderCardRouteProp = RouteProp<RootStackParamList, "TinderCard">;

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

const disciplineColorMap: Record<string, string> = {
  "1": "disciplineHistoriaBrasil",
  "2": "disciplineHistoriaMundial",
  "3": "disciplineGeografia",
  "4": "disciplinePoliticaInternacional",
  "5": "disciplineEconomia",
  "6": "disciplineDireito",
  "7": "disciplinePortugues",
  "8": "disciplineIngles"
};

const data: CardData[] = [
  {
    id: "1",
    subject: "HISTÓRIA DO BRASIL",
    questions: [
      {
        number: 1,
        text: `A sociedade colonial brasileira era escravista e patriarcal, com características distintas nas diferentes regiões do país.`,
        questions: [
          {
            number: 1,
            text: `A formação da sociedade colonial brasileira foi marcada pela concentração de terras nas mãos de uma elite agrária.`,
            answer: "C"
          },
          {
            number: 2,
            text: `O trabalho escravo indígena predominou sobre o africano durante todo o período colonial brasileiro.`,
            answer: "E"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    subject: "HISTÓRIA MUNDIAL",
    questions: [
      {
        number: 1,
        text: `A Revolução Industrial transformou profundamente as relações sociais e econômicas na Europa.`,
        questions: [
          {
            number: 1,
            text: `O processo de industrialização ocorreu de forma simultânea e homogênea em todos os países europeus.`,
            answer: "E"
          },
          {
            number: 2,
            text: `A Inglaterra foi pioneira na Revolução Industrial devido a fatores como acumulação de capital, disponibilidade de mão de obra e recursos naturais.`,
            answer: "C"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    subject: "GEOGRAFIA",
    questions: [
      {
        number: 1,
        text: `A globalização alterou significativamente as relações espaciais e econômicas no mundo contemporâneo.`,
        questions: [
          {
            number: 1,
            text: `O processo de globalização resultou na homogeneização completa dos espaços geográficos e das culturas locais.`,
            answer: "E"
          },
          {
            number: 2,
            text: `A globalização intensificou os fluxos de capitais, mercadorias e informações entre diferentes regiões do planeta.`,
            answer: "C"
          }
        ]
      }
    ]
  },
  {
    id: "4",
    subject: "POLÍTICA INTERNACIONAL",
    questions: [
      {
        number: 1,
        text: `As relações internacionais no século XXI são caracterizadas pela multipolaridade e por novos atores no cenário global.`,
        questions: [
          {
            number: 1,
            text: `Organizações não-governamentais e empresas transnacionais têm papel relevante na política internacional contemporânea.`,
            answer: "C"
          },
          {
            number: 2,
            text: `A ONU perdeu completamente sua relevância como fórum de discussão e resolução de conflitos internacionais após a Guerra Fria.`,
            answer: "E"
          }
        ]
      }
    ]
  },
  {
    id: "5",
    subject: "ECONOMIA",
    questions: [
      {
        number: 1,
        text: `Os sistemas econômicos contemporâneos apresentam diferentes graus de intervenção estatal e liberdade de mercado.`,
        questions: [
          {
            number: 1,
            text: `O neoliberalismo defende a redução da intervenção estatal na economia e a privatização de empresas públicas.`,
            answer: "C"
          },
          {
            number: 2,
            text: `O keynesianismo propõe a eliminação completa do Estado como agente regulador da economia.`,
            answer: "E"
          }
        ]
      }
    ]
  },
  {
    id: "6",
    subject: "DIREITO",
    questions: [
      {
        number: 1,
        text: `O Direito Internacional Público regula as relações jurídicas entre Estados e organizações internacionais.`,
        questions: [
          {
            number: 1,
            text: `Os tratados internacionais são fontes primárias do Direito Internacional Público.`,
            answer: "C"
          },
          {
            number: 2,
            text: `A soberania nacional é um conceito ultrapassado no Direito Internacional contemporâneo.`,
            answer: "E"
          }
        ]
      }
    ]
  },
  {
    id: "7",
    subject: "LÍNGUA PORTUGUESA",
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
    ]
  },
  {
    id: "8",
    subject: "LÍNGUA INGLESA",
    questions: [
      {
        number: 1,
        text: `The United Nations plays a vital role in international diplomacy and conflict resolution.`,
        questions: [
          {
            number: 1,
            text: `The Security Council is composed of fifteen member states, including five permanent members with veto power.`,
            answer: "C"
          },
          {
            number: 2,
            text: `The General Assembly decisions are always binding on all member states.`,
            answer: "E"
          }
        ]
      }
    ]
  }
];

const TinderCard: React.FC = () => {
  const route = useRoute<TinderCardRouteProp>();
  const navigation = useNavigation();
  const { disciplineId } = route.params || { disciplineId: "1" };

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSwipingEnabled, setIsSwipingEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState<string>("");

  const filteredData = data.find((card) => card.id === disciplineId);

  const disciplineColorClass = disciplineColorMap[disciplineId] || "primary";

  const position = useRef(new Animated.ValueXY()).current;

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

  if (!filteredData) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text className="text-xl text-textPrimary">
          Disciplina não encontrada
        </Text>
        <TouchableOpacity
          className={`mt-5 p-3 bg-primary rounded-lg`}
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-medium">Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentCard = filteredData;
  const currentCardItem = currentCard?.questions[currentItemIndex];
  const currentQuestion = currentCardItem?.questions[currentQuestionIndex];

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
          processSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          processSwipe("left");
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
      const { currentQuestionIndex } = stateRef.current;
      const totalQuestionsInItem = currentCardItem.questions.length;
      const totalItemsInCard = currentCard.questions.length;

      if (currentQuestionIndex < totalQuestionsInItem - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (currentItemIndex < totalItemsInCard - 1) {
        setCurrentItemIndex((prev) => prev + 1);
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
        <Text className="text-2xl font-bold mb-5 text-textPrimary">
          Gambito App
        </Text>
        <Text className="text-textPrimary">
          Não há questões disponíveis para esta disciplina
        </Text>
        <TouchableOpacity
          className="mt-5 p-3 bg-primary rounded-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-medium">Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cardStyle = {
    transform: [{ translateX: position.x }, { rotate: rotation }]
  };

  return (
    <View className="flex-1 bg-background">
      <View className="pt-14 px-6 pb-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#002147" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-bold text-textPrimary">
            {currentCard.subject}
          </Text>
        </View>
      </View>

      <View className="flex-1 justify-center items-center">
        <View className="w-full h-[400px] relative justify-center items-center">
          <Animated.View
            className="w-[300px] h-[400px] absolute"
            style={cardStyle}
            {...panResponder.panHandlers}
          >
            <View
              className="w-[300px] h-[400px] bg-surface rounded-lg justify-center items-center shadow-lg"
              style={{ elevation: 3 }}
            >
              <View className={`h-3 w-full bg-${disciplineColorClass}`} />
              <TouchableOpacity
                className="p-4 border-b border-background max-h-[40%] overflow-scroll w-full relative"
                onPress={() => {
                  setModalText(currentCardItem?.text || "");
                  setIsSwipingEnabled(false);

                  setModalVisible(true);
                }}
                activeOpacity={0.7}
              >
                <Text className="text-base mb-2.5 text-textPrimary">
                  {currentCardItem.text}
                </Text>
                <View className="absolute top-1 right-1 bg-background/80 rounded-full p-1">
                  <Ionicons name="expand-outline" size={20} color="#002147" />
                </View>
              </TouchableOpacity>
              <View className="p-4 flex-1">
                <Text className="font-bold mb-1 text-textPrimary">
                  Questão {currentQuestion.number}
                </Text>
                <Text className="text-[15px] mb-5 text-textPrimary">
                  {currentQuestion.text}
                </Text>
                <View className="items-center mt-2.5">
                  <Text className="text-textSecondary text-sm">
                    Deslize para a direita (C) ou para a esquerda (E)
                  </Text>
                </View>
                <View className="flex-row justify-between mt-5">
                  <Animated.View
                    className="w-10 h-10 rounded-full justify-center items-center bg-error/20"
                    style={{ opacity: leftOpacity }}
                  >
                    <Text className="font-bold text-lg text-error">E</Text>
                  </Animated.View>
                  <Animated.View
                    className="w-10 h-10 rounded-full justify-center items-center bg-green-500/20"
                    style={{ opacity: rightOpacity }}
                  >
                    <Text className="font-bold text-lg text-green-500">C</Text>
                  </Animated.View>
                </View>
                {feedback && (
                  <View
                    className={`mt-4 p-2.5 rounded-md items-center ${
                      feedback === "Correto!"
                        ? "bg-green-500/20"
                        : "bg-error/20"
                    }`}
                  >
                    <Text
                      className={`font-bold ${
                        feedback === "Correto!"
                          ? "text-green-500"
                          : "text-error"
                      }`}
                    >
                      {feedback}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsSwipingEnabled(true);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-surface w-[90%] max-h-[80%] rounded-lg p-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-textPrimary">
                Contextualização
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setIsSwipingEnabled(true);
                }}
              >
                <Ionicons name="close" size={24} color="#002147" />
              </TouchableOpacity>
            </View>
            <Text className="text-base text-textPrimary">
              {modalText || "Texto não disponível"}
            </Text>
            <TouchableOpacity
              className={`mt-5 p-3 bg-${disciplineColorClass} rounded-lg items-center`}
              onPress={() => {
                setModalVisible(false);
                setIsSwipingEnabled(true);
              }}
            >
              <Text className="text-white font-medium">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TinderCard;
