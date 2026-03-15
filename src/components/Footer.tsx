import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// keep in sync with App's stack routes
type RootStackParamList = {
  Home: undefined;
  TinderCard: { disciplineId: string };
  Achievements: undefined;
  Profile: undefined;
};

const Footer: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const current = route.name;

  const iconProps = (screen: keyof RootStackParamList) => ({
    color: current === screen ? "#000" : "#333",
  });

  return (
    <View className="absolute left-0 right-0 bottom-0 flex-row justify-around items-center h-16 bg-white border-t border-gray-300 shadow-md">
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        accessibilityLabel="Livros"
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="book" size={28} {...iconProps("Home")} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        accessibilityLabel="Troféu"
        onPress={() => navigation.navigate("Achievements")}
      >
        <Ionicons name="trophy" size={28} {...iconProps("Achievements")} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        accessibilityLabel="Usuário"
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person" size={28} {...iconProps("Profile")} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
