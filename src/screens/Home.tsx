import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Logo from "../components/Logo";

type RootStackParamList = {
  Home: undefined;
  TinderCard: { disciplineId: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const colorMap = {
  disciplineHistoriaBrasil: "#FF6B6B",
  disciplineHistoriaMundial: "#4ECDC4",
  disciplineGeografia: "#1A535C",
  disciplinePoliticaInternacional: "#FFE66D",
  disciplineEconomia: "#6C5B7B",
  disciplineDireito: "#F7B801",
  disciplinePortugues: "#F67280",
  disciplineIngles: "#355C7D"
};

const disciplines = [
  {
    id: "1",
    name: "História do Brasil",
    icon: "book-outline" as const,
    colorClass: "bg-disciplineHistoriaBrasil",
    colorClassLight: "bg-disciplineHistoriaBrasil/20",
    colorName: "disciplineHistoriaBrasil"
  },
  {
    id: "2",
    name: "História Mundial",
    icon: "globe-outline" as const,
    colorClass: "bg-disciplineHistoriaMundial",
    colorClassLight: "bg-disciplineHistoriaMundial/20",
    colorName: "disciplineHistoriaMundial"
  },
  {
    id: "3",
    name: "Geografia",
    icon: "map-outline" as const,
    colorClass: "bg-disciplineGeografia",
    colorClassLight: "bg-disciplineGeografia/20",
    colorName: "disciplineGeografia"
  },
  {
    id: "4",
    name: "Política Internacional",
    icon: "flag-outline" as const,
    colorClass: "bg-disciplinePoliticaInternacional",
    colorClassLight: "bg-disciplinePoliticaInternacional/20",
    colorName: "disciplinePoliticaInternacional"
  },
  {
    id: "5",
    name: "Economia",
    icon: "trending-up-outline" as const,
    colorClass: "bg-disciplineEconomia",
    colorClassLight: "bg-disciplineEconomia/20",
    colorName: "disciplineEconomia"
  },
  {
    id: "6",
    name: "Direito",
    icon: "scale-outline" as const,
    colorClass: "bg-disciplineDireito",
    colorClassLight: "bg-disciplineDireito/20",
    colorName: "disciplineDireito"
  },
  {
    id: "7",
    name: "Língua Portuguesa",
    icon: "text-outline" as const,
    colorClass: "bg-disciplinePortugues",
    colorClassLight: "bg-disciplinePortugues/20",
    colorName: "disciplinePortugues"
  },
  {
    id: "8",
    name: "Língua Inglesa",
    icon: "language-outline" as const,
    colorClass: "bg-disciplineIngles",
    colorClassLight: "bg-disciplineIngles/20",
    colorName: "disciplineIngles"
  }
];

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDisciplinePress = (disciplineId: string) => {
    navigation.navigate("TinderCard", { disciplineId });
  };

  return (
    <View className="flex-1 bg-background">
      <View className="pt-14 pb-6 px-6">
        <Logo width={200} height={106} />
        <Text className="text-base text-textSecondary mt-1">
          Selecione uma disciplina para estudar
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="flex-row flex-wrap justify-between">
          {disciplines.map((discipline) => (
            <TouchableOpacity
              key={discipline.id}
              className="w-[48%] bg-surface rounded-xl mb-4 shadow-sm overflow-hidden"
              style={{ elevation: 2 }}
              onPress={() => handleDisciplinePress(discipline.id)}
            >
              <View className={`h-3 w-full ${discipline.colorClass}`} />
              <View className="p-4 items-center">
                <View
                  className={`w-14 h-14 rounded-full items-center justify-center mb-3 ${discipline.colorClassLight}`}
                >
                  <Ionicons
                    name={discipline.icon}
                    size={26}
                    color={
                      colorMap[discipline.colorName as keyof typeof colorMap]
                    }
                  />
                </View>
                <Text className="text-center font-medium text-textPrimary">
                  {discipline.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
