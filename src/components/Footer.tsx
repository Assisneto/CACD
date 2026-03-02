import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        accessibilityLabel="Livros"
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="book" size={28} {...iconProps("Home")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        accessibilityLabel="Troféu"
        onPress={() => navigation.navigate("Achievements")}
      >
        <Ionicons name="trophy" size={28} {...iconProps("Achievements")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        accessibilityLabel="Usuário"
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person" size={28} {...iconProps("Profile")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    elevation: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Footer;
